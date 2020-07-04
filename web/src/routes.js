import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/bookings" exact component={Bookings}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
