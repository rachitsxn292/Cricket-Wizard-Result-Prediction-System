import React, {Component} from 'react';
import './style.css';
import Axios from 'axios';
import Header from '../../components/Header';
import { Button, Jumbotron} from 'react-bootstrap';

class login extends Component{
    constructor(props)
    {
        super(props);
        {
            this.state = {
                email:'',
                password:''
            }
        }
    }

    email(event){
        this.setState({
            email: event.target.value   
        })
    }

    password(event){
        this.setState({
            password: event.target.value
        })
    }
    
    submitData(event){
        Axios.post('http://localhost:3001/signup',{
            email: this.state.email,
            password: this.state.password
        })
        .then(response=>{
            console.log("Data Inserted");
            this.props.history.push('/')
        });
    }

render()
    {
        return(
        <div className="App">
             <Header/>
                <Jumbotron>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-7">
                                <h1>Cricket Prediction System</h1>
                                    <p>
                                    Cricket Wizard allows the user to understand cricket in greater detail than ever before. 
                                    The unique CricViz computer model enables the prediction of match outcome, 
                                    the interpretation of team and player performance and the anticipation of what is likely to happen next; 
                                    cricket intelligence at the next level
                                    </p>
                                    <p>   
                                        <Button variant="primary">Learn more</Button>
                                    </p>
                            </div>
                            <div class="col-md-2"> 
                            </div>
                            <div class="col-md-3"> 
                                <h2>Enter your Email to get started.</h2>
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.email.bind(this)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password:</label>
                                    <input type="password" class="form-control" id="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.password.bind(this)} required/>
                                </div>
                                <button type="submit" class="btn btn-outline-success"  onClick={this.submitData.bind(this)}>Submit</button>
                            </div>
                        </div> 
                    </div>           
                </Jumbotron>
                <div class="container">
                    <div class="col-md-12">
                        <div>
                            <h1>About Project</h1>
                            <br></br>
                            <p>
                            Prediction in cricket is an important facet from the perspective of both players and spectators. As cricket is played globally across more than 100 member states of the International Cricket Council has an estimated 1.5 billion spectators. Considering the discrete nature of the game the need for analytics as an edge both for on-field performance and other ancillary services such as growing and engaging the fan base is on rage. Analytics can play a key role in enabling the teams to optimize their strategy for a match or a tournament. 
                            The current scenarios consider only the previous scores of the teams in making predictions based on the mathematical model. The various other features like weather conditions, player statistics. and usage of latest machine learning models was missing from the current approach. So, when these aspects are considered in collaboration with the previous ones, it not only helps in improving the prediction of the outcome but also helps Coaches, Team Managers, Players take better decisions in the selection of players in improving the chances of winning a game. 

                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )}
}

export default login;