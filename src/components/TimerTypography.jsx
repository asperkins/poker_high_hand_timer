import React from 'react'

import { Typography } from "@mui/material";

const TimerTypography = (props) => {
    console.log(props.timer)
    return (
        <Typography variant="timer">{props.timerValue}</Typography>
    )
}

export default TimerTypography