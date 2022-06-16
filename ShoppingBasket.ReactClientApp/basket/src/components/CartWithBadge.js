import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWithBadge = () => {
    return (
        <IconButton aria-label="cart">
            <Badge badgeContent={Number(localStorage.getItem("itemCount"))} color="secondary">
                <ShoppingCartIcon style={{ fontSize: 30 }} />
            </Badge >
        </IconButton>
    );
}
export default CartWithBadge;