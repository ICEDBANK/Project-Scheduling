// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import About from './components/About';
import Schedule from './components/Schedule';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default App;
