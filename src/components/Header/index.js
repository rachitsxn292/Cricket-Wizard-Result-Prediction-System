import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Modal } from 'react-bootstrap';

class Header extends Component{

render()
    {
    return(
        <div>
            <Navbar class="DashboardColor" expand="lg" >
                <Navbar.Brand href="/">Cricket Wizard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/visual">Visualizations</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Nav.Link href="#link"><Link to='/signin'>Sign In</Link></Nav.Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
        }
}   
export default Header;



