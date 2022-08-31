import React, { useState, useEffect } from 'react'
import { TextField } from "@mui/material"

export const PromotionTimeStartField = (props) => {
    const [activeTime, setActiveTime] = useState(props.value);


    
    useEffect(() => {
        props.onTimeChange(activeTime)
    }, [activeTime]);

    return (
        <TextField
            label={props.label}
            type="time"
            sx={{ width: '100%' }}
            InputProps={{ style: { fontSize: 40 } }}
            InputLabelProps={{ style: { fontSize: 30 } }}
            onChange={(e) => {
                setActiveTime(e.target.value)
            }}
            value={activeTime}
        />
    )
}