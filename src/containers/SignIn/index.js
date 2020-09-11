import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import './index.css';
import { Button, Jumbotron} from 'react-bootstrap';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            pwd:'',
        }
    }

    SigninData(event)
    {
        
        axios.post('http://localhost:3001/login', {
            id: this.state.id,
            pwd: this.state.pwd,
        })
        .then(response=>{
                cookie.save('email', this.state.id);
                localStorage.setItem('emailLS', this.state.id);
                console.log("Hello",localStorage.getItem("emailLS"))
                console.log("Cookie",cookie.email);
                this.props.history.push('/dashboard');
            });
        } 


    LoginPwd(event){
        this.setState({
            pwd:event.target.value
        })
    }
    LoginID(event){
        this.setState({
            id:event.target.value
        })
    }
    
  render(){
      return(
         <div>
             <Jumbotron class="sign-jbt">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
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
                            <div class="col-md-4"> 
                            <div className="form-group">
                            <div class="w3-container  logead">
                                <h2>Cricket Wizard Sign In</h2>
                            </div>
                            <br/>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                                </div>
                                <input type="email" class="form-control" name="input" value={this.state.id} onChange={this.LoginID.bind(this)} placeholder="Enter Your ID" />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                                </div>
                                <input type="password" class="form-control" name="password" value={this.state.pwd} onChange={this.LoginPwd.bind(this)} placeholder="Enter Your Password" />
                            </div>
                            <div>
                                <button type="submit" class="btn btn-outline-success btn-lg signbtn" value="SignIN" onClick={this.SigninData.bind(this)} name="SignIN" id="SignIN" >Sign In</button>
                            </div>
                        </div>
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
      )
  }
}
export default SignIn;




