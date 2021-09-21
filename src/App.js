import React, { useState } from 'react';
import './App.scss';
import Flights from './pages/flights';
import Hotels from './pages/hotels';
import Aerin from './pages/aerin';
import Login from './pages/login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Flights />
        </Route>
        <Route exact path="/hotel">
          <Hotels />
        </Route>
        <Route exact path="/aerin">
          <Aerin />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
