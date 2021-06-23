import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sell from './Sell';
import Orders from './Orders';


class Navbar extends Component {

  render() {
    return (
      <Router>
        <div>
        <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light">
      <div class="container">
      <a class="navbar-brand" href="#">Supplier</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
     
      <ul class="navbar-nav mr-auto">

        <li class="nav-item active">
          <Link class="nav-link" to="/Sell">Sell</Link>
          <span class="sr-only">(current)</span>
        </li>

        <li class="nav-item">
          <Link class="nav-link" to="/Orders">Order</Link>
        </li>
    
     </ul>
    
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item">
        <a class="nav-link" href="#">{this.props.account}</a>
        </li>
     </ul>

      </div>
    </div>
     </nav>
        </div>
        <Switch>
          <Route path="/Sell">
            <Sell />
          </Route>
          <Route path="/Orders">
            <Orders />
          </Route>
        </Switch>
      </Router>
      
    );
  }
}

export default Navbar;
