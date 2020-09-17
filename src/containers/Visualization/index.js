import React, {Component} from 'react';
import './index.css';
import Axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {  Navbar, Nav, Form, FormControl, Jumbotron} from 'react-bootstrap';
import data from '../../server/models/data';
import Chart from "react-google-charts";


export default class visual extends Component{
    constructor(){
        super();
        this.state = {
            data:[],
            dated:[],
        }
        this.Logout = this.Logout.bind(this);
    }

    componentDidMount(){
        this.getData();
      }

    getData(){
        setTimeout(()=>{
            var email = localStorage.getItem("emailLS");
            const chartData = [['Time','Runs', 'Wickets','Overs','Striker Run','Non Striker Run','Predicted Score']];
            const dateData = [['Date','Time']];
            Axios.get('http://localhost:3001/getDataVisual', {params: {email}})
            .then(res => {
                for (let i = 0; i < res.data.length; i += 1) {
                    chartData.push([res.data[i].time,res.data[i].runs, res.data[i].wickets,res.data[i].overs,res.data[i].striker_run,res.data[i].non_striker_run,Math.round(res.data[i].predicted_score)])
                    const x = res.data[i].time
                    const y = x.split("T")
                    const z =new Date( "'" +(y[0].split("-").join("-"))+"'")
                    dateData.push([z,Math.round(res.data[i].predicted_score)])
                }
                this.setState ({
                    data: chartData,
                    dated: dateData
                })
            });
        },3000)
    }

    Logout = () => {
        //console.log("Cookie Removed You are logged out");
        localStorage.removeItem("emailLS", { path: '/' });
        //console.log("Local Storage",localStorage.getItem("emailLS"))

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
            <div class="cl-chart-bar">
                <h3><u>Prediction of Requested Data</u></h3>
                <Chart
                    width={900}
                    height={850}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{  
                    titleTextStyle:{
                        fontSize: 23,
                    },
                    chartArea: { width: '60%' },
                    bar: {groupWidth: "85%"},
                    hAxis: {
                        title: 'Data',
                    },
                    vAxis: {
                        title: 'Range',
                    },
                    }}
                    legendToggle
                />  
            </div>
            <div>
                <h3 id="cl-h3"><u>User Prediction Timeline</u></h3>
                <div class="l-chart-calendar">
                    <Chart
                        width={1000}
                        height={350}
                        chartType="Calendar"
                        loader={<div>Loading Chart</div>}
                        data={this.state.dated}
                        options={{
                            lantedTextAngle:180
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />
                </div> 
            </div> 
             </Jumbotron>
                        
        </div>  
     </>     
    )}
}
