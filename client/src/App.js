import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import AuthConfirm from './pages/AuthConfirm/AuthConfirm';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Profile from './pages/Profile/Profile';
import Accounts from './pages/Accounts/Accounts';
import Help from './pages/Help/Help';
import Contact from './pages/Contact/Contact';
import Sell from './pages/Sell/Sell';
import Faq from './pages/Faq/Faq';
import NotFoundError from './pages/errors/NotFoundError';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <ErrorHandler>
          <Switch>
            <Route path='/' exact component={Home} />

            <Route path='/auth/:option' exact component={Auth} />
            <Route
              path='/auth/confirm/:confirmationCode'
              exact
              component={AuthConfirm}
            />
            <Route
              path='/auth/resetpassword/:confirmationCode'
              exact
              component={ResetPassword}
            />

            <Route path='/users/:username' exact component={Profile} />

            <Route path='/accounts/edit' exact component={Accounts} />
            <Route path='/accounts/edit/:what' exact component={Accounts} />

            <Route path='/help' exact component={Help} />
            <Route path='/contact' exact component={Contact} />
            <Route path='/sell' exact component={Sell} />
            <Route path='/faq' exact component={Faq} />
            <Route component={NotFoundError} />
          </Switch>
        </ErrorHandler>
      </Router>
    </>
  );
}

export default App;
