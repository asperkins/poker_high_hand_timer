import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Marquee from "react-fast-marquee";
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import { useConfirm } from 'material-ui-confirm';

function MessageMarquee(props) {
    const [messageNotes, setMessageNotes] = useState(props.value);
    const confirm = useConfirm();

    useEffect(() => {
        props.onChange(messageNotes)
    }, [messageNotes]);
    function editMessage (){
        let editDeleteButtons = document.getElementById("editDeleteButtons")
        let messageInput = document.getElementById("messageInput")
        let messageNotes = document.getElementById("messageNotes")
        if (messageInput != null && messageNotes != null) {
            messageInput.style.display = "block"
            messageNotes.style.display = "none"
            editDeleteButtons.style.display = "none"
        }

    }
    return (
        <>
            <Grid container>
                <Grid item md={.75}
                    sx={{
                        paddingTop: 3,
                        paddingRight: 0
                    }}>
                    <div id="editDeleteButtons">
                        <Tooltip title="Edit Marquee Message">
                            <IconButton aria-label="edit"
                                onClick={() => { editMessage();
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
                <Grid item md={11.25}>
                    <div id="messageInput" hidden>
                        <TextField
                            sx={{
                                paddingTop: 2,
                                width: "95%"
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Tooltip title="Save Changes"><IconButton
                                            onClick={() => {
                                                let editDeleteButtons = document.getElementById("editDeleteButtons")
                                                let messageInput = document.getElementById("messageInput")
                                                let messageNotes = document.getElementById("messageNotes")
                                                if (messageInput != null && messageNotes != null) {
                                                    messageInput.style.display = "none"
                                                    messageNotes.style.display = "block"
                                                    editDeleteButtons.style.display = "block"
                                                }
                                            }} >
                                            <CheckIcon />
                                        </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cancel Changes">
                                            <IconButton
                                                onClick={() => {
                                                    let editDeleteButtons = document.getElementById("editDeleteButtons")
                                                    let messageInput = document.getElementById("messageInput")
                                                    let messageNotes = document.getElementById("messageNotes")
                                                    if (messageInput != null && messageNotes != null) {
                                                        messageInput.style.display = "none"
                                                        messageNotes.style.display = "block"
                                                        editDeleteButtons.style.display = "block"
                                                    }
                                                }} >
                                                <ClearIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                            value={messageNotes}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    let editDeleteButtons = document.getElementById("editDeleteButtons")
                                    let messageInput = document.getElementById("messageInput")
                                    let messageNotes = document.getElementById("messageNotes")
                                    if (messageInput != null && messageNotes != null) {
                                        messageInput.style.display = "none"
                                        messageNotes.style.display = "block"
                                        editDeleteButtons.style.display = "block"
                                    }
                                }
                            }}
                            onChange={(e) => {
                                setMessageNotes(e.target.value);
                            }}></TextField>
                    </div>
                    <div id="messageNotes"
                    onClick={() => { editMessage();
                    }}>
                        <h1><Marquee
                            speed={120}
                            gradient={false}
                            value={messageNotes}>{messageNotes}
                        </Marquee></h1>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default MessageMarquee;
