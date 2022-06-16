import { Typography, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React, { Fragment, useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        boxShadow: '3px 3px 5px 6px #90caf9',
    }
}));

const Shipping = (props) => {
    const classes = useStyles();
    const [shippingCost, setShippingCost] = useState(0);
    const [loading, setlLoading] = useState(false);

    useEffect(() => {
        GetShippingCost();
    }, [])

    const GetShippingCost = () => {
        if (props.finalPrice === undefined || props.finalPrice <= 0) {
            return 0;
        }
        setlLoading(true);
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        };

        fetch(
            "http://localhost:5047/api/shipping?totalCost=" + props.finalPrice,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) =>
                setShippingCost(result),
                setlLoading(false)
            )
            .catch((err) => console.error(err));
    }
    return (
        <Fragment>
            {loading
                ?
                <p><em>Loading...</em></p>
                :
                <Typography variant="h4" gutterBottom color="text.secondary">
                    Shipping Cost in AUD  $ {shippingCost}
                </Typography>
            }
        </Fragment>
    );
}


export default Shipping;