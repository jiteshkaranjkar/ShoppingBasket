import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

const Thankyou = () => {

    useEffect(() => {
        localStorage.setItem("itemCount", 0);
    }, [])
    return (
        <div>
            <Stack spacing={4} direction="row" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Typography variant="h4" gutterBottom color="text.secondary">
                    Thank you for Shopping
                </Typography>
                <Confetti 
                />
            </Stack>
        </div>
    )
}

export default Thankyou;