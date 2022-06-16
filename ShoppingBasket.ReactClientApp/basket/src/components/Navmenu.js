import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import './NavMenu.css';


const NavMenu = (props) => {
    return (
        <header>
            <Navbar style={{ backgroundColor: '#90caf9' }} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar-custom" expand="md" light>
                <Container>
                    <NavbarBrand tag={Link} to="/products">
                        <Typography color="inherit" variant="h1">
                            <Button color="inherit" style={{ fontWeight: 950 }}>Shopping Basket</Button>
                        </Typography>
                    </NavbarBrand>
                </Container>
            </Navbar>
        </header >
    );
}
export default NavMenu;