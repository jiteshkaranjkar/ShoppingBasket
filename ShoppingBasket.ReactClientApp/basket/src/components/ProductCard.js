import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { yellow } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Dynamo from '../data/Dynamo.jpg';
import NestleKitkat from '../data/NestleKitkat.jpg';
import Nivea from '../data/Nivea.jpg';
import oralB from '../data/Oral-b.jpg';

const useStyles = makeStyles(() => ({
    root: {
        boxShadow: '6px 3px 6px 3px #90caf9',
        marginLeft: 50,
        marginTop: 50
    },
    ellipsis: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%'
    },
    media: {
        paddingTop: '86.25%',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 'auto'
    },
    subText: {
        paddingTop: '15px',
    }
}));

export default function ProductCard(props) {
    const classes = useStyles();
    const [itemCount, setItemCount] = useState(0);

    const useMountEffect = fun => useEffect(fun, [])

    useMountEffect(() => {
        var qty = 0;
        if (Number(localStorage.getItem("itemCount")) > 0) {
            qty = Number(localStorage.getItem(props.product.id))
        } else {
            localStorage.setItem(props.product.id, 0);
        }
        props.product.quantity = qty;
        setItemCount(localStorage.getItem(props.product.id));
    })

    const addProductClick = (productId) => {
        props.product.quantity = ++props.product.quantity;
        localStorage.setItem(productId, props.product.quantity);
        setItemCount(props.product.quantity);
        props.onUpdateCount(1);
    }

    const removeProductClick = (productId) => {
        if (itemCount > 0) {
            props.product.quantity = --props.product.quantity;
            localStorage.setItem(productId, props.product.quantity);
            setItemCount(props.product.quantity);
            props.onUpdateCount(-1);
        }
    }

    const getCardMedia = (product) => {
        let img;
        switch (product.id) {
            case 1:
            default:
                img = Dynamo;
                break;
            case 2:
                img = NestleKitkat;
                break;
            case 3:
                img = Nivea;
                break;
            case 4:
                img = oralB;
                break;
        }
        return (
            <CardMedia
                className={classes.media}
                image={img}
                title={product.name}
            />)
    }

    return (
        <Fragment>
            {
                props.product !== undefined ?
                    <Card sx={{ maxWidth: 345 }} className={classes.root}>
                        <CardHeader sx={{ bgcolor: yellow[500], textAlign: 'center' }}
                            title={'SAVE $' + props.product.promtionalPrice + ' ' + props.product.currency}
                        />
                        {getCardMedia(props.product)}
                        <CardContent>
                            <Typography variant="body1" gutterBottom color="text.primary" className={classes.ellipsis}>
                                {props.product.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom color="text.secondary" className={classes.ellipsis}>
                                {props.product.description}
                            </Typography>

                            <Typography variant="h6" gutterBottom color="text.secondary">
                                {'$' + props.product.promtionalPrice + ' ' + props.product.currency}
                            </Typography>

                            <Typography variant="caption" gutterBottom color="text.secondary">
                                {'Was $' + props.product.price + ' ' + props.product.currency}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'center' }}>
                            <Fab color="primary" aria-label="add" >
                                <AddIcon sx={{ fontSize: 35 }}
                                    onClick={() => addProductClick(props.product.id)}
                                    aria-label="Add product" />
                            </Fab>
                            <TextField value={itemCount === null ? 0 : itemCount} variant="outlined" style={{ width: "60px", height: "50px", cursor: "none", padding: "20px" }} />
                            <Fab color="secondary" aria-label="remove" >
                                <RemoveIcon sx={{ fontSize: 35 }}
                                    onClick={() => removeProductClick(props.product.id)}
                                    aria-label="Remove product" />
                            </Fab>
                        </CardActions>
                    </Card >
                    :

                    <p><em>Loading...</em></p>
            }
        </Fragment>
    );
}