import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Marquee from "react-fast-marquee";
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Slider, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import SettingsIcon from '@mui/icons-material/Settings'
import { useConfirm } from 'material-ui-confirm';

const MessageMarquee = (props) => {
    const [messageNotes, setMessageNotes] = useState(props.value);
    const [marqueeSpeed, setMarqueeSpeed] = useState(props.speed);
    const confirm = useConfirm();
    
    useEffect(() => {
        props.onMessageNotesChange(messageNotes)
        props.onMarqueeSpeedChange(marqueeSpeed)
    }, [messageNotes, marqueeSpeed]);

    function toggleMarqueeView(inputDisplay, notesDisplay, editDeleteButtonsDisplay, speedSliderDisplay) {
        let editDeleteButtons = document.getElementById("editDeleteButtons")
        let messageInput = document.getElementById("messageInput")
        let messageNotes = document.getElementById("messageNotes")
        let speedSlider = document.getElementById("speedSlider")

        if (messageInput != null && messageNotes != null && editDeleteButtons != null && speedSlider != null) {
            messageInput.style.display = inputDisplay
            messageNotes.style.display = notesDisplay
            editDeleteButtons.style.display = editDeleteButtonsDisplay
            speedSlider.style.display = speedSliderDisplay
        }

    }
    return (
        <>
            <Grid container>
                <Grid item md={1}
                    sx={{
                        paddingTop: 3,
                        paddingRight: 0
                    }}>
                    <div id="editDeleteButtons">
                        <Tooltip title="Edit Marquee Speed">
                            <IconButton aria-label="settings"
                                onClick={() => {
                                    toggleMarqueeView("none", "none", "none", "block");
                                }}>
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Marquee Message">
                            <IconButton aria-label="edit"
                                onClick={() => {
                                    toggleMarqueeView("block", "none", "none", "none");
                                }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Clear Marquee Message">
                            <IconButton aria-label="delete"
                                onClick={() => {
                                    confirm({ description: 'Clear the Marquee Message?' })
                                        .then(() => { setMessageNotes("") })
                                        .catch(() => { /* ... */ });
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Grid>
                <Grid item md={11}>
                    <div id="messageInput" hidden>
                        <TextField
                            sx={{
                                paddingTop: 2,
                                paddingBottom: 0,
                                width: "95%"
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Tooltip title="Save Changes"><IconButton
                                            onClick={() => {
                                                toggleMarqueeView("none", "block", "block", "none")
                                            }} >
                                            <CheckIcon />
                                        </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cancel Changes">
                                            <IconButton
                                                onClick={() => {
                                                    toggleMarqueeView("none", "block", "block", "none")
                                                }}>
                                                <ClearIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                            value={messageNotes}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    toggleMarqueeView("none", "block", "block")
                                }
                            }}
                            onChange={(e) => {
                                setMessageNotes(e.target.value);
                            }}></TextField>
                    </div>
                    <div id="messageNotes"
                        onClick={() => {
                            toggleMarqueeView("block", "none", "none");
                        }}>
                        <h1><Marquee
                            speed={marqueeSpeed}
                            gradient={false}
                            value={messageNotes}>{messageNotes}</Marquee></h1>
                    </div>
                    <div id="speedSlider" hidden>
                        <Grid container sx={{
                            paddingTop: 3
                        }}>
                            <Grid item md={.3}></Grid>
                            <Grid item md={1.4} sx={{ paddingTop:1}}>
                                Marquee Scroll Speed
                            </Grid>
                            <Grid item md={.3}
                                sx={{
                                    paddingBottom: 2
                                }}>
                                <Tooltip title="Save Changes"><IconButton
                                    onClick={() => {
                                        toggleMarqueeView("none", "block", "block", "none")
                                    }} >
                                    <CheckIcon />
                                </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item md={5.5} sx={{ paddingTop:1}}>
                                <Slider defaultValue={marqueeSpeed} step={10} marks min={10} max={600}
                                    onChange={(e) => {
                                        setMarqueeSpeed(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default MessageMarquee;
