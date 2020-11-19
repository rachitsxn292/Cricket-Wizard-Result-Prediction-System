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
                winner:'',
                image:''
                
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
        var images = ["https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/HyderabadDeccanChargers.png/200px-HyderabadDeccanChargers.png"
                    ,"https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png"
                    ,"https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png"
                    ,"https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_2020.svg/250px-Royal_Challengers_Bangalore_2020.svg.png"
                    ,"https://i.pinimg.com/originals/28/09/a8/2809a841bb08827603ccac5c6aee8b33.png"
                    ,"https://seeklogo.com/images/I/ipl-kings-xi-punjab-logo-6747D5C02B-seeklogo.com.png"
                    ,"https://www.pngkit.com/png/full/269-2699483_delhi-daredevils-logo-delhidaredevils-delhi-dare-devils-logo.png"
                    ,"https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Rajasthan_Royals_Logo.svg/1200px-Rajasthan_Royals_Logo.svg.png"]
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
            var x = response.data;
            if (x.trim()==='Deccan Chargers'){
                console.log("Inside Deccan Charges");
                this.setState({
                    image: images[0]
                })
            }
            else if (x.trim()==='Kolkata Knight Riders'){
                console.log("Inside KKR");
                this.setState({
                    image: images[1]
                })
            }
            else if (x.trim()==='Chennai Super Kings'){
                console.log("Inside CSK");
                this.setState({
                    image: images[2]
                })
            }
            else if (x.trim()==='Royal Challengers Bangalore'){
                console.log("Inside RCB");
                this.setState({
                    image: images[3]
                })
            }
            else if (x.trim()==='Mumbai Indians'){
                console.log("Inside MI");
                this.setState({
                    image: images[4]
                })
            }
            else if (x.trim()==='Kings XI Punjab'){
                console.log("Inside KXIP");
                this.setState({
                    image: images[5]
                })
            }
            else if (x.trim()==='Delhi Daredevils'){
                console.log("Inside DD");
                this.setState({
                    image: images[6]
                })
            }
            else if (x.trim()==='Rajasthan Royals'){
                console.log("Inside RR");
                this.setState({
                    image: images[7]
                })
            }
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
            <div class="prem-img"><img src={this.state.image} width="150" height="200"></img></div>
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