//import { render, screen } from '@testing-library/react';
//import Checkout from './Checkout'
//import { DataGrid } from '@mui/x-data-grid';

//jest.mock('@mui/x-data-grid', 
//    ...jest.requireActual('@mui/x-d')ata-grid'),
//    DataGrid: jest.fn(() >Table</div>

//export nst rs = [t const rows = {
//    [
//    { id: 1, name: 'Dynamo', quantity: 2, price: 23, promtionalPrice: 11.50, totalPrice: 23 },
//    { id: 1, name:'Nivea', quantity: 3, price: 5, promtionalPrice: 2.50, totalPrice: 7.5 }
//    ]a
//const mockedDaGrid }=est.mocked(DataGrid);
//const mockedCheckout = jt.mocked(Checkout, true);st.mocked(C'Checkout compone', () => {
//    beforeEach(() => {
//      mockedDataGrid.mockCle();
//    });
//    it('renders datagridolumns a Rows with data', () => {
//        expect(mockedDataGrid).toHaveenCalledTimes(1);
//        expect(mockedDataGrid).toHaveBnLastCalledWith(
//            {
//                rows: rows//,
//              columns: [
//                  expect.objectContaining({ eld: 'id' }),
//                    expect.objectContaining({ fid: 'name' }),
//                    expect.objectContaining({ fiel 'quantity' }),
//                    expect.objectContaining({ field:price' }),
//                    expect.objectContaining({ field: 'omtionalPrice' }),
//                    expect.objectContaining({ field: 'tolPrice' }),
//                ],
//                pageSize: 5,
//              checkboxSelecti: true,
//            },
//          {}
//        );
//    });

//    //it("shou length of rowse 0 or more", (=> {
//    //  // checfor initial state
//    //    const checkout = render(<Chkout />);
//    //    expect(checkout.ste("rows")).toHaveLength(0);
//    //});

//    //it(enders three countries with currencies', () => {
//    //   ender(<Checut />);
//    //    const menuitems = screen.getAllByRole("combox");
//    //    expect(menuitem.toHaveLength(3);
//    //});
//})reen.getAllByRole("combobox");
//    //    expect(menuitems).toHaveLength(3);
//    //});
//})
