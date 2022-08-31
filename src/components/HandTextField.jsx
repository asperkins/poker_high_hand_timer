import React, { useState, useEffect } from 'react'
import { TextField } from "@mui/material"

const HandTextField = (props) => {
    const [hand, setHand] = useState(props.value);

    useEffect(() => {
        props.onHandChange(hand)
    }, [hand]);

    return (
        <TextField
            className="HandTextField"
            label={props.label}
            variant="filled"
            sx={{
                background: 'black',
                width: '100%',
                input: {
                    fontSize: 140,
                    color: props.color,
                    textTransform: "uppercase"
                },
                label: {
                    color: props.labelColor,
                    fontSize: 40
                }
            }}
            inputProps={{ maxlength: 11 }}
            // eslint-disable-next-line 
            InputProps={{ style: { fontSize: 40 } }}
            InputLabelProps={{ style: { fontSize: 30 } }}
            onChange={(e) => {
                setHand(e.target.value)
            }}
            value={props.value}
        />
    )
}

export default HandTextField