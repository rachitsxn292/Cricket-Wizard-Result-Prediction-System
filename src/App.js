import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
import login from './containers/Home/index';
import dashboard from './containers/Dashboard/index';

function routers() {
  return (
      <BrowserRouter>
            <div>
                <Route exact path="/" component={login}/>
                <Route path="/dashboard" component={dashboard}/>
                </div>
        </BrowserRouter>   
  );
}

export default routers;
