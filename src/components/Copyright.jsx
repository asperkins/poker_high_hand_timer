import React from 'react'

import { Typography } from "@mui/material";

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}Perkins Consulting, LLC {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright