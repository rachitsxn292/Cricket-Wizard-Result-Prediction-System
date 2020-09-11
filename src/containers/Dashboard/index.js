import React, {Component} from 'react';
import './style.css';
import Axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Bar} from 'react-chartjs-2';
import {Link} from 'react-router-dom';
import {  Navbar, Nav, Form, FormControl, Jumbotron} from 'react-bootstrap';
import { PayPalButton } from "react-paypal-button-v2"

class dashboard extends Component{
    constructor(props)
    {
        super(props);
        {
            this.state = {
                runs:'',
                wickets:'',
                overs:'',
                lrun:'',
                lwicket:'',
                striker:'',
                nstriker:'',
                pred:'',
                
            }
        }
    }

    runs(event){
        this.setState({
            runs: event.target.value   
        })
    }

    wickets(event){
        this.setState({
            wickets: event.target.value
        })
    }

    overs(event){
        this.setState({
            overs: event.target.value
        })
    }
    
    lrun(event){
        this.setState({
            lrun: event.target.value
        })
    }
    
    lwicket(event){
        this.setState({
            lwicket: event.target.value
        })
    }
    
    striker(event){
        this.setState({
            striker: event.target.value
        })
    }
    
    nstriker(event){
        this.setState({
            nstriker: event.target.value
        })
    }

    Logout = () => {
        cookie.remove('email', { path: '/' })
        console.log("Cookie Removed You are logged out");
        localStorage.removeItem("emailLS", { path: '/' });
        console.log("Local Storage",localStorage.getItem("emailLS"))

    }
    
    
    submitData(event){
        var email = localStorage.getItem("emailLS");
        Axios.post('http://localhost:3001/userData',{
            email,
            runs:this.state.runs,
            wickets:this.state.wickets,
            overs:this.state.overs,
            lrun:this.state.lrun,
            lwicket:this.state.lwicket,
            striker:this.state.striker,
            nstriker:this.state.nstriker
        })
        .then(response=>{
            //console.log("Data Inserted", response,response.data);
            this.setState({
                pred: response.data
            })
            //this.props.history.push('/')
        });
    }

render()
    {
        let prediction = this.state.pred;
        let redirectVar=null;
        var email = localStorage.getItem("emailLS");
        if(!(email)){
            redirectVar=<Redirect to='/'/>
        }
        return(
        <div className="App"> 
        {redirectVar}
        <Navbar class="DashboardColor" expand="lg" >
                <Navbar.Brand href="/">Cricket Wizard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/visual">Visualizations </Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Nav.Link href="/" onClick = {this.Logout}>Sign Out</Nav.Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Jumbotron>
                    <div class="container">
                        <h3>Enter details to get Predictions</h3>
                        <h3 class="h2-dash">Get Access to real-time predictions pay using <span><img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="PayPal" /></span></h3>
                        <div class="row">
                                <div class="col-md-3"> 
                                    <div class="form-group">
                                        <label for="runs">Runs:</label>
                                        <input type="runs" class="form-control" id="email" placeholder="Enter Runs" value={this.state.runs} onChange={this.runs.bind(this)} name="runs"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="wickets">Wickets:</label>
                                        <input type="wickets" class="form-control" id="wickets" placeholder="Enter Wickets" value={this.state.wickets} onChange={this.wickets.bind(this)} name="wickets"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="overs">Overs:</label>
                                        <input type="overs" class="form-control" id="overs" placeholder="Enter Over" value={this.state.overs} onChange={this.overs.bind(this)} name="overs"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="runsLast">Last Run:</label>
                                        <input type="runsLast" class="form-control" id="runsLast" placeholder="Enter Last Run" value={this.state.lrun} onChange={this.lrun.bind(this)} name="runsLast"/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="lastWicket">Last Wickets:</label>
                                        <input type="lastWicket" class="form-control" id="lastWicket" placeholder="Enter Last Wickets" value={this.state.lwicket} onChange={this.lwicket.bind(this)} name="lastWicket"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="striker">Striker:</label>
                                        <input type="striker" class="form-control" id="striker" placeholder="Enter Striker" value={this.state.striker} onChange={this.striker.bind(this)} name="striker"/>
                                    </div>
                                    <div class="form-group">
                                            <label for="nonStriker">Non Striker:</label>
                                            <input type="nonStriker" class="form-control" id="nonStriker" placeholder="Enter Non Striker" value={this.state.nstriker} onChange={this.nstriker.bind(this)} name="nonStriker"/>
                                    </div>
                                    <div>
                                      
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <div class="vl"></div>
                                </div>
                                <div class ="col-md-5">
                                    <br/>
                                    <PayPalButton class="paypal-btn-dash" amount="0.01" onSuccess={(details, data) => {
                                        alert("Transaction completed by " + details.payer.name.given_name);
                                        return fetch("/paypal-transaction-complete", {
                                            method: "post",
                                            body: JSON.stringify({
                                            orderID: data.orderID
                                            })
                                          });
                                        }}
                                    />
                                    <h3>-------------Enter Promo Code------------</h3>
                                    <div class="form-group">
                                            <input type="promoCode" class="form-control" id="nonStriker" placeholder="Enter Promo Code in XXX-YYY format"  onChange={this.nstriker.bind(this)} name="nonStriker"/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12"> 
                                    <h6>* all fields are mandatory</h6>
                                    <button type="submit" class="btn btn-danger btn-lg prediction_btn"  onClick={this.submitData.bind(this)}><Link to='/visual'>Press for Normal Prediction</Link></button>
                                </div>
                            </div>
                        </div>
                        <div class="container premium-btn">
                            <div class="row">
                                <div class="col-md-12"> 
                                    <button type="submit" class="btn btn-danger btn-lg prediction_btn"  onClick={this.submitData.bind(this)}>Validate Promo Code</button>
                                </div>
                            </div>
                        </div>
                        </Jumbotron>
                        
        </div>  

               
    )}
}

export default dashboard;