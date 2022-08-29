import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles'
import ringer from "./alarm.mp3";
import queryString from "query-string"

const audio = new Audio(ringer);
audio.loop = false;

const queryParams = queryString.parse(window.location.search)
console.log(queryParams);
try {
  if (queryParams.clear === "true") {
    console.log("Clearing local storage");
    localStorage.clear();
  }
} catch (error) {
  console.log(error)
}


try {
  if (localStorage.getItem('sessionState') == null) {
    const sessionState = {
      waitForHandToComplete: "no",
      intervalTime: 10,
      currentHand: "",
      currentTable: "",
      currentSeat: "",
      previousHand: "",
      previousTable: "",
      previousSeat: "",
      activeStartTime: "12:00",
      activeEndTime: "22:00",
    }
    localStorage.setItem('sessionState', JSON.stringify(sessionState));
  }
} catch (error) {
  localStorage.clear();
}
console.log("Loading Saved Session");
const sessionState = JSON.parse(localStorage.getItem('sessionState'));

function saveSessionState(sessionState) {
  console.log("Saving Session");
  localStorage.setItem('sessionState', JSON.stringify(sessionState));
  console.log("Session" + localStorage.getItem("sessionState"));
}

const TimerButton = styled(Button)({
  color: 'gold',
  backgroundColor: 'transparent',
  "&:hover": {
    //you want this to be the same as the backgroundColor above
    backgroundColor: "transparent"
  },
  padding: 0,
  width: '100%',
  height: 450,
  fontSize: 440
});

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function SignIn() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('99:99');

  const getTimeRemaining = (e) => {
    let date = new Date();

    let startDate = new Date();
    startDate.setHours(String(activeStartTime).substring(0, 2));
    startDate.setMinutes(String(activeStartTime).substring(3, 5));
    let endDate = new Date();
    endDate.setHours(String(activeEndTime).substring(0, 2));
    endDate.setMinutes(String(activeEndTime).substring(3, 5));

    let seconds = 99;
    let minutes = 99;

    if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
      console.log("Session Active");
      seconds = 59 - date.getSeconds();
      minutes = sessionState.intervalTime - (date.getMinutes() % sessionState.intervalTime) - 1;
    }

    return {
      minutes, seconds
    };
  }


  const startTimer = () => {
    let { minutes, seconds } = getTimeRemaining();
    setTimer(
      (minutes > 9 ? minutes : '0' + minutes) + ':'
      + (seconds > 9 ? seconds : '0' + seconds)
    )

  }

  const updateTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  function moveCurrentHand() {
    setPreviousHand(currentHand);
    setPreviousTable(currentTable);
    setPreviousSeat(currentSeat);
    setCurrentHand("");
    setCurrentSeat("");
    setCurrentTable("");
    setHandCompleteButtonDisabled(true);
  }
  const [currentHand, setCurrentHand] = useState(sessionState.currentHand);
  const [currentTable, setCurrentTable] = useState(sessionState.currentTable);
  const [currentSeat, setCurrentSeat] = useState(sessionState.currentSeat);
  const [previousHand, setPreviousHand] = useState(sessionState.previousHand);
  const [previousTable, setPreviousTable] = useState(sessionState.previousTable);
  const [previousSeat, setPreviousSeat] = useState(sessionState.previousSeat);
  const [intervalTime, setIntervalTime] = useState(sessionState.intervalTime);
  const [waitForHandToComplete, setWaitForHandToComplete] = useState(sessionState.waitForHandToComplete);
  const [handCompleteButtonDisabled, setHandCompleteButtonDisabled] = useState(true);
  const [activeStartTime, setActiveStartTime] = useState(sessionState.activeStartTime);
  const [activeEndTime, setActiveEndTime] = useState(sessionState.activeEndTime);

  useEffect(() => {
    updateTimer();
  }, [activeEndTime, activeStartTime]);
  useEffect(() => {
    console.log(timer);
    if (timer === "00:00") {
      console.log("alarm");
      audio.play();
      if (waitForHandToComplete === "yes") {
        setHandCompleteButtonDisabled(false);
      } else {
        moveCurrentHand();
      }
    }
  }, [timer]);

  useEffect(() => {
    sessionState.currentHand = currentHand;
    sessionState.currentSeat = currentSeat;
    sessionState.currentTable = currentTable;
    sessionState.previousHand = previousHand;
    sessionState.previousSeat = previousSeat;
    sessionState.previousTable = previousTable;
    sessionState.intervalTime = intervalTime;
    sessionState.waitForHandToComplete = waitForHandToComplete;
    sessionState.activeEndTime = activeEndTime;
    sessionState.activeStartTime = activeStartTime;

    console.log(currentHand);
    saveSessionState(sessionState);
  }, [currentHand, currentSeat, currentTable, previousHand, previousSeat, previousTable, intervalTime, waitForHandToComplete, activeStartTime, activeEndTime]);

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}Perkins Consulting, LLC {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xxl" fullWidth
        sx={{
          // borderTop: "1px solid grey",
          // borderRight: "1px solid grey",
          // borderBottom: "1px solid grey",
          // borderLeft: "1px solid grey",
          // height: 250
        }}
      >
        <Grid container rowGap={2}
          sx={{
            // borderTop: "1px solid grey",
            // borderRight: "1px solid grey",
            // borderBottom: "1px solid grey",
            // borderLeft: "1px solid grey",
            // height: 250
          }}
          direction="row"
          alignItems="center"
          justifyContent="center">
          <Grid item md={8}
            sx={{
              // borderTop: "1px solid grey",
              // borderRight: "1px solid grey",
              // borderBottom: "1px solid grey",
              // borderLeft: "1px solid grey",
              // height: 250
              paddingLeft: 5,
            }}>
            <TimerButton variant="contained" onClick={() => {
              audio.loop = false;
              //audio.play();
            }}>{timer}</TimerButton>
          </Grid>
          <Grid item md={4}>
            <Grid container
              sx={{

                // borderTop: "1px solid grey",
                // borderRight: "1px solid grey",
                // borderBottom: "1px solid grey",
                // borderLeft: "1px solid grey",
                // // height: 250
                paddingTop: 0,
                paddingLeft: 8,
                paddingBottom: 4,
                // width: 500
              }}
            // direction="column"
            // alignItems="center"
            // justifyContent="center"
            >
              <Grid item md={12}
                sx={{

                  // borderTop: "1px solid grey",
                  // borderRight: "1px solid grey",
                  // borderBottom: "1px solid grey",
                  // borderLeft: "1px solid grey",
                  // // height: 250
                  paddingTop: 4,
                  // paddingLeft: 8,
                  paddingBottom: 2,
                  // width: 500
                }}>
                <TextField
                  id="select"
                  label="Interval"
                  value={intervalTime}
                  select
                  sx={{ width: '85%' }}
                  onChange={(e) => setIntervalTime(e.target.value)}
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}>
                  <MenuItem value="10">10 minutes</MenuItem>
                  <MenuItem value="20">20 minutes</MenuItem>
                  <MenuItem value="30">30 minutes</MenuItem>
                  <MenuItem value="60">60 minutes</MenuItem>
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="select"
                  label="Wait for last hand to complete"
                  value={waitForHandToComplete}
                  select
                  sx={{ width: '85%' }}
                  onChange={(e) => setWaitForHandToComplete(e.target.value)}
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}>
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                </TextField>
              </Grid>
              <Grid item
                sx={{
                  paddingTop: 5,
                  paddingRight: 2
                }}>
                <Button
                  id="HandComplete"
                  variant="contained"
                  sx={{ height: 55 }}
                  disabled={handCompleteButtonDisabled}
                  onClick={moveCurrentHand}
                >Hands Completed</Button>
              </Grid>
              <Grid item sx={{
                paddingTop: 5,
                paddingRight: 2
              }}>
                <TextField
                  label="Promotion Start"
                  type="time"
                  value={activeStartTime}
                  onChange={(e) => {
                    setActiveStartTime(e.target.value);
                  }}></TextField>

              </Grid>
              <Grid item sx={{
                paddingTop: 5,
              }}>
                <TextField
                  label="Promotion End"
                  type="time"
                  value={activeEndTime}
                  onChange={(e) => {
                    setActiveEndTime(e.target.value);
                  }}></TextField>

              </Grid>

            </Grid>
          </Grid>

          <Grid item
            sx={{
              // borderTop: "1px solid grey",
              // borderRight: "1px solid grey",
              // borderBottom: "1px solid grey",
              // borderLeft: "1px solid grey",
              // height: 250
            }}
          >
            <Grid container rowSpacing={2}
              sx={{
                // borderTop: "1px solid grey",
                // borderRight: "1px solid grey",
                // borderBottom: "1px solid grey",
                // borderLeft: "1px solid grey",
                // height: 250
              }}

              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item md={8}>
                <TextField
                  id="currentHand"
                  label="CURRENT HIGH HAND"
                  inputProps={{ maxlength: 11 }}
                  sx={{ background: 'black', width: '95%', input: { fontSize: 170, color: 'green', textTransform: "uppercase" }, label: { fontSize: 40 } }}
                  variant='filled'
                  value={currentHand}
                  onChange={(e) => setCurrentHand(e.target.value)} />
              </Grid>
              <Grid item md={1.58}
                sx={{

                  // borderTop: "1px solid grey",
                  // borderRight: "1px solid grey",
                  // borderBottom: "1px solid grey",
                  // borderLeft: "1px solid grey",
                  // // height: 250
                  // paddingTop: 0,
                  // paddingLeft: 8,
                  paddingBottom: 9,
                  // width: 500
                }}>
                <TextField
                  id="currentTable"
                  label="TABLE"
                  type="number"
                  inputProps={{ maxlength: 2 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                  }}
                  sx={{ background: 'black', width: '95%', input: { fontSize: 120, color: 'green' }, label: { fontSize: 40 } }}
                  variant='filled'
                  value={currentTable}
                  onChange={(e) => setCurrentTable(e.target.value)} />
              </Grid>
              <Grid item md={1.58}
                sx={{
                  paddingBottom: 9,
                }}>
                <TextField
                  id="currentSeat"
                  label="SEAT"
                  type="number"
                  inputProps={{ maxlength: 2 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                  }}
                  sx={{ background: 'black', width: '95%', input: { fontSize: 120, color: 'green' }, label: { fontSize: 40 } }}
                  variant='filled'
                  value={currentSeat}
                  onChange={(e) => setCurrentSeat(e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container rowSpacing={2}
            sx={{
              // borderTop: "1px solid grey",
              // borderRight: "1px solid grey",
              // borderBottom: "1px solid grey",
              // borderLeft: "1px solid grey",
              // height: 250
            }}

            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item md={8}>
              <TextField
                id="previousHand"
                label="PREVIOUS HIGH HAND"
                inputProps={{ maxlength: 11 }}
                variant='filled'
                value={previousHand}
                sx={{ background: 'black', width: '95%', input: { fontSize: 167, color: '#666666', textTransform: "uppercase" }, label: { color: '#666666', fontSize: 40 } }}
                onChange={(e) => setPreviousHand(e.target.value)} />
            </Grid>
            <Grid item md={1.58}
              sx={{
                paddingBottom: 9,
              }}>
              <TextField
                id="previousTable"
                label="TABLE"
                variant='filled'
                type="number"
                inputProps={{ maxlength: 2 }}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                }}
                value={previousTable}
                sx={{ background: 'black', width: '90%', input: { fontSize: 120, color: '#666666' }, label: { color: '#666666', fontSize: 40 } }}
                onChange={(e) => setPreviousTable(e.target.value)} />
            </Grid>
            <Grid item md={1.58} sx={{
              paddingBottom: 9,
            }}>
              <TextField
                id="previousSeat"
                label="SEAT"
                variant='filled'
                type="number"
                inputProps={{ maxlength: 2 }}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                }}
                value={previousSeat}
                sx={{ background: 'black', width: '90%', input: { fontSize: 120, color: '#666666' }, label: { color: '#666666', fontSize: 40 } }}
                onChange={(e) => setPreviousSeat(e.target.value)} />
            </Grid>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </ThemeProvider >
  );
}