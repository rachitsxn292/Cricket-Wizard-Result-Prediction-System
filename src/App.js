import React from 'react';
import './App.css';
import {BrowserRouter as  Switch, Route, Link} from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
import login from './containers/Home/index';
import dashboard from './containers/Dashboard/index';
import signIn from './containers/SignIn/index';
import visual from './containers/Visualization/index';
import premium from './containers/premium/index';

function routers() {
  return (
      <BrowserRouter>
            <div>
                <Route exact path="/" component={login}/>
                <Route path="/dashboard" component={dashboard}/>
                <Route path="/signin" component={signIn}/>
                <Route path="/visual" component={visual}/>
                <Route path="/premium" component={premium}/>
                </div>
        </BrowserRouter>   
  );
}

export default routers;
