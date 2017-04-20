import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Examples from './components/examples/index';

export default class App extends Component {


  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Examples</Link></li>
          </ul>
          <Route exact path="/" component={Examples} />
        </div>
      </Router>
    );
  }
}
