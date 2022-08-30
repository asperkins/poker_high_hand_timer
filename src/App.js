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
import MessageMarquee from "./MessageMarque";
import { ConfirmProvider } from 'material-ui-confirm';


const audio = new Audio(ringer);
audio.loop = false;

const queryParams = queryString.parse(window.location.search)

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

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
      intervalTime: 20,
      currentHand: "",
      currentTable: "",
      currentSeat: "",
      previousHand: "",
      previousTable: "",
      previousSeat: "",
      activeStartTime: "12:00",
      activeEndTime: "22:00",
      messageNotes: "HORSESHOE TUNICA HIGH HAND PROMOTION - FULL HOUSE OR BETTER PAYS $100 ON REGULAR TABLES AND $200 ON THE FEATURED TABLE. OMAHA HANDS MUST FLOP THE HAND TO QUALIFY",
      marqueeSpeed: 100
    }
    localStorage.setItem('sessionState', JSON.stringify(sessionState));
  }
} catch (error) {
  console.log(error);
  localStorage.clear();
}

const sessionState = JSON.parse(localStorage.getItem('sessionState'));

const saveSessionState = (sessionState) => {
  localStorage.setItem('sessionState', JSON.stringify(sessionState));
}

const TimerButton = styled(Button)({
  color: 'gold',
  backgroundColor: 'transparent',
  "&:hover": {
    backgroundColor: "transparent"
  },
  "& .MuiTouchRipple-root span": {
    backgroundColor: 'transparent',
  },
  padding: 0,
  width: '100%',
  height: 340,
  fontSize: 420
});

const App = () => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('99:99');

  const getTimeRemaining = (e) => {
    let date = new Date();
    /** Check if current time is within the promotion time frame */
    let startDate = new Date();
    startDate.setHours(String(activeStartTime).substring(0, 2));
    startDate.setMinutes(String(activeStartTime).substring(3, 5));
    let endDate = new Date();
    endDate.setHours(String(activeEndTime).substring(0, 2));
    endDate.setMinutes(String(activeEndTime).substring(3, 5));

    let seconds = 99;
    let minutes = 99;

    if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
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

  const moveCurrentHand = () => {
    setPreviousHand(currentHand);
    setPreviousTable(currentTable);
    setPreviousSeat(currentSeat);
    setCurrentHand("");
    setCurrentSeat("");
    setCurrentTable("");
  }
  const [currentHand, setCurrentHand] = useState(sessionState.currentHand);
  const [currentTable, setCurrentTable] = useState(sessionState.currentTable);
  const [currentSeat, setCurrentSeat] = useState(sessionState.currentSeat);
  const [previousHand, setPreviousHand] = useState(sessionState.previousHand);
  const [previousTable, setPreviousTable] = useState(sessionState.previousTable);
  const [previousSeat, setPreviousSeat] = useState(sessionState.previousSeat);
  const [intervalTime, setIntervalTime] = useState(sessionState.intervalTime);
  const [waitForHandToComplete, setWaitForHandToComplete] = useState(sessionState.waitForHandToComplete);
  const [handCompleteButtonDisabled, setHandCompleteButtonDisabled] = useState(false);
  const [activeStartTime, setActiveStartTime] = useState(sessionState.activeStartTime);
  const [activeEndTime, setActiveEndTime] = useState(sessionState.activeEndTime);
  const [messageNotes, setMessageNotes] = useState(sessionState.messageNotes);
  const [marqueeSpeed, setMarqueeSpeed] = useState(sessionState.marqueeSpeed);

  useEffect(() => {
    updateTimer();
  }, [activeEndTime, activeStartTime]);

  useEffect(() => {
    if (timer === "00:00") {
      audio.play();
      if (waitForHandToComplete === "yes") {

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
    sessionState.messageNotes = messageNotes;
    sessionState.marqueeSpeed = marqueeSpeed;
    setHandCompleteButtonDisabled(waitForHandToComplete === "no");
    saveSessionState(sessionState);
    console.log(sessionState)
  }, [currentHand, currentSeat, currentTable, previousHand, previousSeat, previousTable, intervalTime, waitForHandToComplete, activeStartTime, activeEndTime, messageNotes, marqueeSpeed]);

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}Perkins Consulting, LLC {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <ConfirmProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xxl" fullWidth>
        <Grid container rowGap={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ paddingTop: 4 }}>
          <Grid item md={8}
            sx={{
              paddingLeft: 5,
            }}>
            <TimerButton variant="contained" onClick={() => { }}>{timer}</TimerButton>
          </Grid>
          <Grid item md={4}>
            <Grid container
              sx={{
                paddingTop: 0,
                paddingLeft: 5,
                paddingBottom: 0,
                paddingRight: 5
              }}>
              <Grid item md={6} sx={{
                paddingTop: 0,
                paddingRight: 1
              }}>
                <TextField
                  label="Promotion Start"
                  type="time"
                  sx={{ width: '100%' }}
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}
                  value={activeStartTime}
                  onChange={(e) => {
                    setActiveStartTime(e.target.value);
                  }}></TextField>
              </Grid>
              <Grid item md={6} sx={{
                paddingTop: 0,
              }}>
                <TextField
                  label="Promotion End"
                  type="time"
                  sx={{ width: '100%' }}
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}
                  value={activeEndTime}
                  onChange={(e) => {
                    setActiveEndTime(e.target.value);
                  }}></TextField>
              </Grid>

              <Grid item md={12}
                sx={{
                  paddingTop: 2,
                  paddingBottom: 2,
                }}>
                <TextField
                  id="select"
                  label="Interval"
                  value={intervalTime}
                  select
                  sx={{ width: '100%' }}
                  onChange={(e) => setIntervalTime(e.target.value)}
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}>
                  <MenuItem value="10">10 minutes</MenuItem>
                  <MenuItem value="15">15 minutes</MenuItem>
                  <MenuItem value="20">20 minutes</MenuItem>
                  <MenuItem value="30">30 minutes</MenuItem>
                  <MenuItem value="60">60 minutes</MenuItem>
                </TextField>
              </Grid>
              <Grid item md={8}>
                <TextField
                  id="select"
                  label="Wait for last hand to complete"
                  value={waitForHandToComplete}
                  select
                  sx={{ width: '100%' }}
                  onChange={(e) => setWaitForHandToComplete(e.target.value)}
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}>
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                </TextField>
              </Grid>
              <Grid item md={4}
                sx={{
                  paddingTop: 0,
                  paddingLeft: 2
                }}>
                <Button
                  id="HandComplete"
                  variant="contained"
                  sx={{ height: '100%', fontSize: 17 }}
                  disabled={handCompleteButtonDisabled}
                  onClick={moveCurrentHand}
                >Final Hands Completed</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container rowSpacing={2}
              direction="row"
              // alignItems="center"
              justifyContent="center"
              sx={{
                paddingBottom: 0,
                paddingRight: 5
              }}>
              <Grid item md={8}
                sx={{
                  paddingBottom: 0,
                  paddingLeft: 8
                }}>
                <TextField
                  id="currentHand"
                  label="CURRENT HIGH HAND"
                  inputProps={{ maxlength: 11 }}
                  sx={{ background: 'black', width: '100%', input: { fontSize: 140, color: 'green', textTransform: "uppercase" }, label: { fontSize: 40 } }}
                  variant='filled'
                  value={currentHand}
                  onChange={(e) => setCurrentHand(e.target.value)} />
              </Grid>
              <Grid item md={2}
                sx={{
                  paddingBottom: 1,
                  paddingLeft: 8
                }}>
                <TextField
                  id="currentTable"
                  label="TABLE"
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                  }}
                  sx={{ background: 'black', width: '100%', input: { fontSize: 140, color: 'green', textAlign: 'center' }, label: { fontSize: 40 } }}
                  variant='filled'
                  value={currentTable}
                  onChange={(e) => setCurrentTable(e.target.value)} />
              </Grid>
              <Grid item md={2}
                sx={{
                  paddingBottom: 1,
                  paddingLeft: 8
                }}>
                <TextField
                  id="currentSeat"
                  label="SEAT"
                  type="number"
                  inputProps={{ maxlength: 2 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                  }}
                  sx={{ background: 'black', width: '100%', input: { fontSize: 140, color: 'green', textAlign: 'center' }, label: { fontSize: 40 } }}
                  variant='filled'
                  value={currentSeat}
                  onChange={(e) => setCurrentSeat(e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container rowSpacing={2}
            direction="row"
            // alignItems="center"
            justifyContent="center"
            sx={{
              paddingBottom: 0,
              paddingRight: 5
            }}>

            <Grid item md={8}
              sx={{
                paddingBottom: 0,
                paddingLeft: 8
              }}>
              <TextField
                id="previousHand"
                label="PREVIOUS HIGH HAND"
                inputProps={{ maxlength: 11 }}
                variant='filled'
                value={previousHand}
                sx={{ background: 'black', width: '100%', input: { fontSize: 140, color: '#666666', textTransform: "uppercase" }, label: { color: '#666666', fontSize: 40 } }}
                onChange={(e) => setPreviousHand(e.target.value)} />
            </Grid>
            <Grid item md={2}
              sx={{
                paddingBottom: 0,
                paddingLeft: 8
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
                sx={{ background: 'black', width: '100%', input: { fontSize: 140, color: '#666666', textAlign: 'center' }, label: { color: '#666666', fontSize: 40 } }}
                onChange={(e) => setPreviousTable(e.target.value)} />
            </Grid>
            <Grid item md={2}
              sx={{
                paddingBottom: 0,
                paddingLeft: 8
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
                sx={{ background: 'black', width: '100%', input: { fontSize: 140, color: '#666666', textAlign: 'center' }, label: { color: '#666666', fontSize: 40 } }}
                onChange={(e) => setPreviousSeat(e.target.value)} />
            </Grid>
          </Grid>
          <Grid md={12}
            sx={{
              paddingTop: 0,
              paddingLeft: 8,
              paddingRight: 5,
              paddingBottom: 0
            }}>
            <MessageMarquee
              value={messageNotes}
              speed={marqueeSpeed}
              onMessageNotesChange={(message)=>{setMessageNotes(message)}}
              onMarqueeSpeedChange={(speed)=>{setMarqueeSpeed(speed)}}
               />
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </ThemeProvider >
    </ConfirmProvider>
  );
}
export default App;