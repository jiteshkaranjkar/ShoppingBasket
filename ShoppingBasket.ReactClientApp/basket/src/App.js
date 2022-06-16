import React, { Component } from 'react';
import { Route, Router } from "react-router-dom";
import Checkout from './components/Checkout';
import history from './components/history';
import { Layout } from './components/Layout';
import Products from './components/Products';
import Thankyou from './components/Thankyou';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        }
        this.fetchBasket = this.fetchBasket.bind(this);
    }

    componentDidMount() {
        this.fetchBasket();
    }

    async fetchBasket() {
        
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        };

        fetch(
            "http://localhost:5047/api/products",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) =>
                this.setState(() => {
                    return {
                        products: result,
                        loading: false
                    }
                }))
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <Router history={history}>
                <Layout>
                    {this.state.loading
                        ?
                        <p><em>Loading...</em></p>
                        :
                        <div>
                            <Route exact path='/'>
                                <Products products={this.state.products} />
                            </Route>
                            <Route path='/products' component={Products}>
                                <Products products={this.state.products} />
                            </Route>
                            <Route path='/checkout' component={Checkout}>
                                <Checkout products={this.state.products} />
                            </Route>
                            <Route path='/thankyou' component={Thankyou}>
                                <Thankyou />
                            </Route>
                        </div>
                    }
                </Layout>
            </Router>
        );
    }
}