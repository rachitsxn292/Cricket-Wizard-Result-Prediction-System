import React, {Component} from 'react';
import './index.css';
import Axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {  Navbar, Nav, Form, FormControl, Jumbotron} from 'react-bootstrap';
import data from '../../server/models/data';


export default class visual extends Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
        this.Logout = this.Logout.bind(this);
    }

    componentDidMount(){
        var email = localStorage.getItem("emailLS");
        console.log("Email for User in Visual",email);
        Axios.get('http://localhost:3001/getDataVisual', {params: {email}})
        .then(res => {
            this.setState ({
                data: res.data
            })
            console.log("Data",this.state.data)
        });
        
    }

    Logout = () => {
        console.log("Cookie Removed You are logged out");
        localStorage.removeItem("emailLS", { path: '/' });
        console.log("Local Storage",localStorage.getItem("emailLS"))

    }
    
    
    render(){
        let redirectVar=null;
        var email = localStorage.getItem("emailLS");
        if(!(email)){
            redirectVar=<Redirect to='/'/>
        }
        return(
        <>
        <div className="App"> 
        {redirectVar}
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
                    <Nav.Link href="/" onClick = {this.Logout}>Sign Out</Nav.Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Jumbotron>
                    
             </Jumbotron>
                        
        </div>  
     </>     
    )}
}
