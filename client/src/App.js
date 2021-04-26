import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Help from './pages/Help/Help';
import Contact from './pages/Contact/Contact';
import Sell from './pages/Sell/Sell';
import Faq from './pages/Faq/Faq';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/help' exact component={Help} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/sell' exact component={Sell} />
          <Route path='/faq' exact component={Faq} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
