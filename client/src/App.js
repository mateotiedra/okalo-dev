import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { CssBaseline } from '@material-ui/core';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import AuthConfirm from './pages/AuthConfirm/AuthConfirm';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Profile from './pages/Profile/Profile';
import Accounts from './pages/Accounts/Accounts';
import Search from './pages/Search/Search';
import Sell from './pages/Sell/Sell';
import Faq from './pages/Faq/Faq';
import NotFoundError from './pages/errors/NotFoundError';
import Bid from './pages/Bid/Bid';
import Saved from './pages/Saved/Saved';
import EditBid from './pages/EditBid/EditBid';

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

            <Route
              path='/users/:username'
              exact
              component={Profile}
              key={Math.random()}
            />
            <Route path='/users/u/:pageStatus' exact component={Profile} />

            <Route path='/accounts/edit' exact component={Accounts} />
            <Route path='/accounts/edit/:what' exact component={Accounts} />

            <Route path='/bids/saved' exact component={Saved} />
            <Route path='/bids/:uuid' exact component={Bid} />
            <Route path='/bids/edit/:uuid' exact component={EditBid} />

            <Route path='/contact' exact component={Faq} />
            <Route path='/search' exact component={Search} />
            <Route path='/sell' exact component={Sell} />
            <Route component={NotFoundError} />
          </Switch>
        </ErrorHandler>
      </Router>
    </>
  );
}

export default App;
