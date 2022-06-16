import { Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartWithBadge from './CartWithBadge';
import ProductCard from './ProductCard';


const Products = ({ products }) => {
    const history = useHistory();
    const [itemCount, setItemCount] = useState(0);

    const handleClick = () => {
        history.push("./checkout");
    }

    const updateCount = (currentCount) => {
        var qty = localStorage.getItem("itemCount");
        var itemCount = qty !== null ? parseInt(qty) : 0;

        setItemCount(itemCount + currentCount);
        localStorage.setItem("itemCount", Number(itemCount) + currentCount);
    }

    return (
        <div >
            <Stack spacing={4} direction="row" style={{ display: 'flex', justifyContent: 'center' }}>
                <div >
                    <Typography color="inherit" variant="h4" gutterBottom>
                        Products

                        <CartWithBadge count={itemCount} />
                    </Typography>
                    <Typography variant="overline" display="block" style={{ fontWeight: 750 }} gutterBottom >
                        <Button variant="contained" color="primary" onClick={() => handleClick()} style={{ display: 'flex', justifyContent: 'center' }}
                            disabled={Number(localStorage.getItem("itemCount")) > 0 ? false : true}>
                            Go to Basket
                        </Button>
                    </Typography>
                </div>
            </Stack>
            <Grid container spacing={3}>
                {products.map(prod =>
                    <Grid item xs={12} sm={6} md={3} key={prod.id} >
                        <ProductCard key={prod.id} product={prod} onUpdateCount={updateCount} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}


export default Products;