import './components/App.css';
import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import ringer from "./components/alarm.mp3";
import queryString from "query-string"
import { ConfirmProvider } from 'material-ui-confirm';
import { Copyright, HandTextField, MessageMarquee, PromotionTimeTextField, TableSeatTextField } from "./index.js";
import TimerTypography from './components/TimerTypography';

const audio = new Audio(ringer);
audio.loop = false;

const queryParams = queryString.parse(window.location.search)

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
},
);

theme.typography.timer = {
  color: 'gold',
  fontSize: '6rem',
  '@media (min-width:600px)': {
    fontSize: '8rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '10rem',
    lineHeight: .8,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12rem',
    lineHeight: .8,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '18rem',
    lineHeight: .8,
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '28rem',
    lineHeight: .8,
  },
};

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

  const moveCurrentHand = () => {
    console.log("Current" + currentHand)
    console.log("Previous" + previousHand)
    setPreviousHand(currentHand);
    setPreviousTable(currentTable);
    setPreviousSeat(currentSeat);
    setCurrentHand("");
    setCurrentSeat("");
    setCurrentTable("");
  }

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
  }, [currentHand, currentSeat, currentTable, previousHand, previousSeat, previousTable, intervalTime, waitForHandToComplete, activeStartTime, activeEndTime, messageNotes, marqueeSpeed]);


  return (
    <ConfirmProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="xxl" fullWidth>
          <Grid container rowGap={0}
            // direction="row"
            // alignItems="center"
            // justifyContent="center"
            sx={{ paddingTop: 4, }}>
            <Grid item xl={8} md={12}
              sx={{
                paddingLeft: 0,
                alignContent: "center",
              }}>
              <center><TimerTypography timerValue={timer}>{timer}</TimerTypography></center>
              {/* <TimerButton variant="contained" onClick={() => { }}>{timer}</TimerButton> */}
            </Grid>
            <Grid item xl={4} lg={12}>
              <Grid container
                sx={{
                  paddingTop: 0,
                  paddingLeft: 0,
                  paddingBottom: 0,
                  paddingRight: 5
                }}>
                <Grid xl={6} lg={2} sx={{
                  paddingTop: 2,
                  paddingRight: 1,
                  paddingLeft: 2,
                }}>
                  <PromotionTimeTextField
                    label="Promotion Start"
                    value={activeStartTime}
                    onTimeChange={(time) => {
                      setActiveStartTime(time);
                    }} />
                </Grid>
                <Grid item xl={6} lg={2} sx={{
                  paddingTop: 2,
                  paddingLeft: 2,
                }}>
                  <PromotionTimeTextField
                    label="Promotion End"
                    value={activeEndTime}
                    onTimeChange={(time) => {
                      setActiveEndTime(time);
                    }} />
                </Grid>
                <Grid item xl={12} lg={2}
                  sx={{
                    paddingTop: 2,
                    paddingBottom: 0,
                    paddingLeft: 2,
                  }}>
                  <TextField
                    id="select"
                    label="Interval"
                    value={intervalTime}
                    select
                    sx={{ width: '100%' }}
                    onChange={(e) => setIntervalTime(e.target.value)}
                    InputProps={{ style: { fontSize: '150%' } }}
                    InputLabelProps={{ style: { fontSize: '150%' } }}>
                    <MenuItem value="10">10 minutes</MenuItem>
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="20">20 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">60 minutes</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xl={8} lg={4}
                  sx={{
                    paddingTop: 2,
                    paddingBottom: 0,
                    paddingLeft: 2,
                  }}>
                  <TextField
                    id="select"
                    label="Wait for last hand to complete"
                    value={waitForHandToComplete}
                    select
                    sx={{ width: '100%' }}
                    onChange={(e) => setWaitForHandToComplete(e.target.value)}
                    InputProps={{ style: { fontSize: '150%' } }}
                    InputLabelProps={{ style: { fontSize: '150%' } }}>
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xl={4} lg={2}
                  sx={{
                    paddingTop: 2,
                    paddingLeft: 2
                  }}>
                  <Button
                    id="HandComplete"
                    variant="contained"
                    sx={{ height: '90%', fontSize: '90%' }}
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
                <Grid item xl={8} md={8}
                  sx={{
                    paddingBottom: 0,
                    paddingLeft: 2,
                  }}>
                  <HandTextField
                    id="currentHand"
                    label="CURRENT HIGH HAND"
                    value={currentHand}
                    color="green"
                    onHandChange={(hand) => setCurrentHand(hand)}
                    onChange={(e) => setCurrentHand(e.target.value)}
                  />
                </Grid>
                <Grid item xl={2} md={2}
                  sx={{
                    paddingBottom: 1,
                    paddingLeft: 2
                  }}>
                  <TableSeatTextField
                    id="currentTable"
                    label="TABLE"
                    value={currentTable}
                    color="green"
                    onValueChange={(value) => setCurrentTable(value)}
                  />
                </Grid>
                <Grid item xl={2} md={2}
                  sx={{
                    paddingBottom: 1,
                    paddingLeft: 2
                  }}>
                  <TableSeatTextField
                    id="currentSeat"
                    label="SEAT"
                    value={currentSeat}
                    color="green"
                    onValueChange={(value) => setCurrentSeat(value)}
                  />
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

              <Grid item xl={8} md={8}
                sx={{
                  paddingBottom: 0,
                  paddingLeft: 2
                }}>
                <HandTextField
                  id="previousHand"
                  label="PREVIOUS HIGH HAND"
                  value={previousHand}
                  color="#666666"
                  labelColor="#666666"
                  onHandChange={(hand) => setPreviousHand(hand)}
                />
              </Grid>
              <Grid item xl={2} md={2}
                sx={{
                  paddingBottom: 0,
                  paddingLeft: 2
                }}>
                <TableSeatTextField
                  id="previousTable"
                  label="TABLE"
                  value={previousTable}
                  onValueChange={(value) => setPreviousTable(value)}
                />
              </Grid>
              <Grid item xl={2} md={2}
                sx={{
                  paddingBottom: 0,
                  paddingLeft: 2
                }}>
                <TableSeatTextField
                  id="previousSeat"
                  label="SEAT"
                  value={previousSeat}
                  color=""
                  onValueChange={(value) => setPreviousSeat(value)}
                />
              </Grid>
            </Grid>
            <Grid xl={12}
              sx={{
                paddingTop: 0,
                paddingLeft: 8,
                paddingRight: 5,
                paddingBottom: 0
              }}>
              <MessageMarquee
                value={messageNotes}
                speed={marqueeSpeed}
                onMessageNotesChange={(message) => { setMessageNotes(message) }}
                onMarqueeSpeedChange={(speed) => { setMarqueeSpeed(speed) }}
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