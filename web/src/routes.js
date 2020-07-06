import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import NewBooking from './pages/NewBooking';

import AdminHome from './pages/AdminHome';
import AdminViewSlots from './pages/AdminViewSlots';
import AdminCreateSlot from './pages/AdminCreateSlot';
import AdminViewUsers from './pages/AdminViewUsers';

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/bookings" exact component={Bookings}/>
        <Route path="/bookings/new" exact component={NewBooking}/>

        <Route path="/admin" exact component={AdminHome}/>
        <Route path="/admin/slots" exact component={AdminViewSlots}/>
        <Route path="/admin/slots/new" exact component={AdminCreateSlot}/>
        <Route path="/admin/users" exact component={AdminViewUsers}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
