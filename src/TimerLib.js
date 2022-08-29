// import React from 'react';
// import { sessionState } from './Session';
// import { useState, useRef } from 'react'
// import './App.css';


// export const getTimeRemaining = (e) => {
//     let date = new Date();        
//     const seconds = 59 - date.getSeconds();
//     const minutes = sessionState.intervalTime - (date.getMinutes() % sessionState.intervalTime) - 1;
//     return {
//         minutes, seconds
//     };
// }

// export const startTimer = () => {
//     let { minutes, seconds } = getTimeRemaining();
//     setTimer(
//         (minutes > 9 ? minutes : '0' + minutes) + ':'
//         + (seconds > 9 ? seconds : '0' + seconds)
//     )
// }

// export const updateTimer = (e) => {
//     if (Ref.current) clearInterval(Ref.current);
//     const id = setInterval(() => {
//         startTimer(e);
//     }, 1000)
//     Ref.current = id;
// }
