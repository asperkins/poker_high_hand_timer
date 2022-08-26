import './App.css';
import Button from '@mui/material/Button';
import React, { useState, useRef, useEffect } from 'react'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { TimerTwoTone } from '@mui/icons-material';
import { styled } from '@mui/system'

const TimerButton = styled(Button)({
  color: 'gold',
  backgroundColor: '#333333',
  padding: 8,
  borderRadius: 24,
  // width: 400,
  height: 400,
  fontSize: 500
});
const HandTextField = styled(TextField)({
  color: 'gold',
  width: 700,
  height:100,
})
const TableTextField = styled(TextField)({
  color: 'gold',
  width: 300,
  height:100,
})
const SeatTextField = styled(TextField)({
  color: 'gold',
  width: 300,
  height:100,
})

function getMinutes() {
  let date = new Date();
  let currentMinutes = date.getMinutes();
  let minutes = currentMinutes - 40;
  if (currentMinutes < 20) {
    minutes = currentMinutes;
  } else if (currentMinutes < 40) {
    minutes = currentMinutes - 20
  }
  return 19 - minutes;
}
function getSeconds() {
  let date = new Date();
  let seconds = date.getSeconds();
  return 59 - seconds;
}

const App = () => {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = getSeconds();
    const minutes = getMinutes();
    return {
      total, minutes, seconds
    };
  }

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  const updateTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    // setTimer('00:00:10');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 12300);
    return deadline;
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    updateTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  // const onClickReset = () => {
  //     clearTimer(getDeadTime());
  // }

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}Perkins Consulting, LLC {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Container maxWidth="100%">
          <div className="App">
            <TimerButton variant="contained" startIcon={<TimerTwoTone />} fullWidth>{timer}</TimerButton>
          </div>
          
          <grid Container columnSpacing={12}>
            <grid item>
              <HandTextField multiline InputProps={{ style: { fontSize: 200 }}}>Hand</HandTextField>
            </grid>
            <grid item>
              <TableTextField multiline InputProps={{ style: { fontSize: 200 }}}>Table</TableTextField>
            </grid>
            <grid item>
              <SeatTextField multiline InputProps={{ style: { fontSize: 200 }}}>Table</SeatTextField>
            </grid>
          </grid>
          
        </Container>
        <Copyright />
      </ThemeProvider>
    </>
  )
}

export default App;