import { render, screen } from '@testing-library/react';
import Products from './Products';

test('renders three countries with currencies', () => {
    render(<Products />);
    const gotToBasket = screen.getByText("Go to Basket");
    expect(linkElement).toBeInTheDocument();
});

const mockResponse = {
    [{
        "name": "Dynamo Detergent Liquid 1.8l",
        "description": "Dynamo Professional 1.8L, 36 washloads.",
        "price": 23,
        "currency": "AUD",
        "promtionalPrice": 11.5,
        "quantity": 0,
        "id": 1
    },
    {
        "name": "Oral-b Electric Toothbrush",
        "description": "Oral-B Pro 800 Electric Toothbrush",
        "price": 100,
        "currency": "AUD",
        "promtionalPrice": 50,
        "quantity": 0,
        "id": 2
    }]
}


it("fetch products list", async () => {
    fetch.mockResponseOnce(JSON.stringify({
       
    }));

})
