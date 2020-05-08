import React from 'react';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Modal } from 'react-bootstrap';

const Header = (props) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div class="topNavbar">
            <Navbar bg="light" expand="lg" >
                <Navbar.Brand href="#home">Cricket Wizard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" onClick={handleShow}>Sign In</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Already Have an account ! Then go ahead and Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter Email" name="email"/>
                    </div>
                    <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter Password" name="email"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger"  onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-success" onClick={handleClose}>
                    <Link to='/dashboard'>Submit</Link>
                    </Button>
                </Modal.Footer>
                {/* <Modal.Footer>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="google">
                                    <GoogleLogin
                                        clientId="624602059574-qsv45kcgn89v376114ql2ps2t5rljfd7.apps.googleusercontent.com"
                                        buttonText="Sign in with Google"
                                        // onSuccess={this.responseGoogle}
                                        // onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </div>
                            <div class="col-md-4">
                            </div>
                            <div class="col-md-2">
                                <Button variant="btn-block btn-success" onClick={handleClose}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer> */}
            </Modal>
        </div>
       
    )
}
export default Header;



