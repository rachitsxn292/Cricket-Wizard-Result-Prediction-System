import React, {Component} from 'react';
import './style.css';
import Axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {  Navbar, Nav, Form, FormControl, Jumbotron} from 'react-bootstrap';

class premium extends Component{
    constructor(props)
    {
        super(props);
        {
            this.state = {
                team1:'',
                team2:'',
                city:'',
                toss:'',
                bteam:'',
                venue:'',
                pred:'',
                winner:''
                
            }
        }
    }

    team1(event){
        this.setState({
            team1: event.target.value   
        })
    }

    team2(event){
        this.setState({
            team2: event.target.value
        })
    }

    city(event){
        this.setState({
            city: event.target.value
        })
    }
    
    toss(event){
        this.setState({
            toss: event.target.value
        })
    }
    
    bteam(event){
        this.setState({
            bteam: event.target.value
        })
    }
    
    venue(event){
        this.setState({
            venue: event.target.value
        })
    }

    winner(event){
        this.setState({
            venue: event.target.value
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
        Axios.post('http://localhost:3001/premium',{
            email,
            team1:this.state.team1,
            team2:this.state.team2,
            city:this.state.city,
            toss:this.state.toss,
            bteam:this.state.bteam,
            venue:this.state.venue,
            winner: this.state.team1
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
            <div class="premiumres"><h2>{this.state.pred}</h2></div>
                    <div class="container">
                        <h3>Enter details to get Predictions</h3>
                        <div class="row">
                                <div class="col-md-3"> 
                                    <div class="form-group">
                                        <label for="team1">Team 1:</label>
                                        <input type="team1" class="form-control" id="team1" placeholder="Enter Team1" value={this.state.team1} onChange={this.team1.bind(this)} name="team1" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="team2">Team 2:</label>
                                        <input type="team2" class="form-control" id="team2" placeholder="Enter Team2" value={this.state.team2} onChange={this.team2.bind(this)} name="team2" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="city">City:</label>
                                        <input type="city" class="form-control" id="city" placeholder="Enter City" value={this.state.city} onChange={this.city.bind(this)} name="city" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="toss">Toss:</label>
                                        <input type="toss" class="form-control" id="toss" placeholder="Enter Toss Winner" value={this.state.toss} onChange={this.toss.bind(this)} name="toss" required/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="bteam">Batting Team:</label>
                                        <input type="bteam" class="form-control" id="bteam" placeholder="Enter Batting Team" value={this.state.bteam} onChange={this.bteam.bind(this)} name="bteam" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="venue">Venue:</label>
                                        <input type="venue" class="form-control" id="venue" placeholder="Enter Venue" value={this.state.venue} onChange={this.venue.bind(this)} name="venue" required/>
                                    </div>
                                    <div>
                                      
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <div class="vl"></div>
                                </div>
                                <div class ="col-md-5">
                                    <br/>
                                </div>
                            </div>
                        </div> 
                        <div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12"> 
                                    <h6>* all fields are mandatory</h6>
                                    <button type="submit" class="btn btn-danger btn-lg prediction_btn"  onClick={this.submitData.bind(this)}>Press for Premium Prediction</button>
                                </div>
                            </div>
                        </div>
                        <div class="container premium-btn">
                            <div class="row">
                                <div class="col-md-12"> 
                                </div>
                            </div>
                        </div>
                        </Jumbotron>              
        </div>  

               
    )}
}

export default premium;