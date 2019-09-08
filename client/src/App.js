import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Chat from './pages/chat';
import Home from './pages/home';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* Added Routing */}
          <Route exact path='/' component={Home} />
          <Route exact path='/chat' component={Chat} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
