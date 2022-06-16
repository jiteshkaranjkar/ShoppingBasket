import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import history from './history';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component, Fragment } from 'react';


const columns = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Product Name', width: 300 },
    { field: 'description', headerName: 'Description', width: 400, editable: true },
    { field: 'price', headerName: 'Price (Currency)', width: 200 },
    { field: 'promtionalPrice', headerName: 'Promotional Price (Currency)', width: 250 },
    { field: 'quantity', headerName: 'Quantity', width: 200, editable: true },
    { field: 'totalPrice', headerName: 'Total Price (Currency)', width: 200 }
];

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            totalItems: 0,
            rows: props.products,
            finalPrice: 0,
            loading: true,
            shippingCost: 0,
            currency: 'AUD',
            orderPlaced: false
        }
        this.LoadRows = this.LoadRows.bind(this);
        this.GetShippingCost = this.GetShippingCost.bind(this);
        this.handleCellEditStart = this.handleCellEditStart.bind(this);
        this.handleCellEditStop = this.handleCellEditStop.bind(this);
        this.handleCellEditCommit = this.handleCellEditCommit.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
        this.CurrencyConversion = this.CurrencyConversion.bind(this);
        this.ConvertCurrency = this.ConvertCurrency.bind(this);
        this.GetCurrencyText = this.GetCurrencyText.bind(this);
    }

    componentDidMount() {
        this.LoadRows(this.state.currency);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.finalPrice !== this.state.finalPrice) {
            this.GetShippingCost();
        }
    }

    LoadRows = (updatedCurrency) => {
        var updatedPrice = 0;
        var items = 0;
        var rows = [];
        for (var i = 0; i < this.state.rows.length; i++) {
            var qty = localStorage.getItem(this.state.rows[i].id);
            qty = qty !== null ? parseInt(qty) : 0;
            if (qty !== 0) {
                var row = {
                    id: this.state.rows[i].id,
                    name: this.state.rows[i].name,
                    description: this.state.rows[i].description,
                    quantity: qty === null ? 0 : qty,
                    currencyPrice: this.state.rows[i].currencyPrice,
                    price: this.CurrencyConversion(updatedCurrency, this.state.rows[i].currencyPrice),
                    currencyPromtionalPrice: this.state.rows[i].currencyPromtionalPrice,
                    promtionalPrice: this.CurrencyConversion(updatedCurrency, this.state.rows[i].currencyPromtionalPrice),
                    totalPrice: this.CurrencyConversion(updatedCurrency, this.state.rows[i].currencyPromtionalPrice) * qty,
                }
                updatedPrice = updatedPrice + row.totalPrice;
                items = items + qty;
                rows.push(row)

            }
            this.setState(() => {
                return {
                    rows: rows,
                    finalPrice: updatedPrice,
                    totalItems: items
                }
            });


        }
    }


    GetShippingCost = () => {
        if (this.state.finalPrice === undefined || this.state.finalPrice < 0) {
            return 0;
        }
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        };

        fetch(
            `http://localhost:5047/api/shipping?totalCost=${this.state.finalPrice}&currency=${this.state.currency}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) =>
                this.setState(() => {
                    return {
                        shippingCost: result,
                        loading: false
                    }
                }))
            .catch((err) => console.error(err));
    }

    CurrencyConversion(updatedCurrency, price) {
        return this.ConvertCurrency(updatedCurrency, price);
    }

    ConvertCurrency(currency, price) {
        switch (currency) {
            case 'AUD':
                return price * 1;
            case 'INR':
                return price * 54;
            case 'USD':
                return price * .70;
            default:
                return price * 1;
        }
    }

    handleCellEditStart = (params, event) => {
        const quantity = params.value;
        const updatedRows = this.state.rows.map((row) => {
            if (row.id === params.id) {
                return { ...row, quantity };
            }
            return row;
        });
        localStorage.setItem(params.id, quantity);
        this.setState({ rows: updatedRows });
    };

    handleCellEditStop = (params, event) => {
        this.LoadRows(this.state.currency);
        var totalQty = 0;
        for (var i = 0; i < this.state.rows.length; i++) {
            totalQty += Number(this.state.rows[i].quantity);
        }
        localStorage.setItem("itemCount", totalQty);
    };

    handleCellEditCommit = (params, event) => {
        const quantity = params.value;
        const updatedRows = this.state.rows.map((row) => {
            if (row.id === params.id) {
                return { ...row, quantity };
            }
            return row;
        });
        localStorage.setItem(params.id, quantity);
        this.setState({ rows: updatedRows });
    };
    handleCurrency = (event) => {
        this.setState({ currency: event.target.value });
        this.LoadRows(event.target.value);
    };

    handlePlaceOrder = () => {
        var basket = {
            products: this.state.rows,
            totalQuantity: this.state.totalItems,
            totalPrice: this.state.finalPrice,
            shippingCost: this.state.shippingCost
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(basket, null, 2),
        };

        fetch(
            "http://localhost:5047/api/shipping",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) =>
                this.setState(() => {
                    return {
                        orderPlaced: result
                    }
                }))
            .catch((err) => console.error(err));


        history.push("./thankyou");
    }

    GetCurrencyText() {
        if (this.state.currency === "INR") {
            return "INR Rs"
        } if (this.state.currency === "USD") {
            return "USD $"
        } else return "AUD $"
    }

    render() {
        return (
            <Fragment>
                <Typography color="inherit" variant="h4" gutterBottom >
                    Basket
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.currency}
                        label="Currency"
                        onChange={this.handleCurrency}
                    >
                        <MenuItem value="AUD">Australia</MenuItem>
                        <MenuItem value="INR">India - INR (1 AUD = 54 INR)</MenuItem>
                        <MenuItem value="USD">United States - USD (1 AUD = 0.70 USD)</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={this.state.rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onCellEditStart={this.handleCellEditStart}
                        onCellEditStop={this.handleCellEditStop}
                        onCellEditCommit={this.handleCellEditCommit}
                    />
                    <div style={{ marginBottom: 50 }}>
                        <Stack spacing={2} direction="column" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h5" gutterBottom color="text.secondary">
                                Total basket items {this.state.totalItems}
                            </Typography>
                            <Typography variant="h5" gutterBottom color="text.secondary">
                                Total Price in {this.GetCurrencyText() + ' ' + this.state.finalPrice}
                            </Typography>
                            <Typography variant="h5" gutterBottom color="text.secondary">
                                Shipping Cost in {this.GetCurrencyText() + ' ' + this.state.shippingCost}
                            </Typography>
                        </Stack>
                    </div>
                    <Button variant="contained" color="primary" onClick={() => this.handlePlaceOrder()} disabled={this.state.totalItems > 0 ? false : true}>
                        <Typography variant="overline" display="block" style={{ fontWeight: 750 }} gutterBottom >
                            Place Order
                        </Typography>
                    </Button>
                </div>
            </Fragment >
        );
    }
}