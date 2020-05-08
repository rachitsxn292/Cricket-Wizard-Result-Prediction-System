import React, {Component} from 'react';
import './style.css';
import Axios from 'axios';
import Header from '../../components/Header';
import { Button, Jumbotron} from 'react-bootstrap';

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
    
    
    submitData(event){
        Axios.post('http://localhost:3001/userData',{
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
        return(
        <div className="App">
            <div class="sidenav">
            <a href="#about">Home</a>
            <a href="#services">Dashboard</a>
            <a href="#clients">About</a>
            <a href="#contact">Sign Out</a>
            </div>  
            <div class="container">
                <div class="row">  
                    `<div class="col-md-3"> 
                    </div>`
                    <div class="com-md-6"> 
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
                    </div>
                    <div class="col-md-3">
                    <div class="form-group">
                            <label for="runsLast">Last Run:</label>
                            <input type="runsLast" class="form-control" id="runsLast" placeholder="Enter Last Runs" value={this.state.lrun} onChange={this.lrun.bind(this)} name="runsLast"/>
                        </div>
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
                        <button type="submit" class="btn btn-outline-success"  onClick={this.submitData.bind(this)}>Submit</button>
                        <div>
                            {prediction}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )}
}

export default dashboard;