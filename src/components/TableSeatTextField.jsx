import React, { useState, useEffect } from 'react'
import { TextField } from "@mui/material"

const TableSeatTextField = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onValueChange(value)
    }, [value]);

    return (
        <TextField
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
            type="number"
            onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
              }}
            InputProps={{ style: { fontSize: 40 } }}
            InputLabelProps={{ style: { fontSize: 30 } }}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            value={props.value}
        />
    )
}

export default TableSeatTextField