import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Customer/Home'
import Menu from './pages/Customer/Menu'
import Register from './pages/Customer/Register'
import Login from './pages/Customer/Login'
import VerifyEmail from './pages/Customer/VerifyEmail'

import Profile from './pages/Customer/Profile'
import EditProfile from './pages/Customer/EditProfile'
import Bookings from './pages/Customer/Bookings'
import NewBooking from './pages/Customer/NewBooking'

import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome from './pages/Admin/AdminHome';
import AdminViewSlots from './pages/Admin/AdminViewSlots';
import AdminCreateSlot from './pages/Admin/AdminCreateSlot';
import AdminViewUsers from './pages/Admin/AdminViewUsers';
import AdminCreateUser from './pages/Admin/AdminCreateUser';

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/menu" exact component={Menu}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/users/verify/:token" exact component={VerifyEmail}/>

        <Route path="/profile" exact component={Profile}/>
        <Route path="/profile/edit" exact component={EditProfile}/>
        <Route path="/bookings" exact component={Bookings}/>
        <Route path="/bookings/new" exact component={NewBooking}/>

        <Route path="/admin/login" exact component={AdminLogin}/>
        <Route path="/admin" exact component={AdminHome}/>
        <Route path="/admin/slots" exact component={AdminViewSlots}/>
        <Route path="/admin/slots/new" exact component={AdminCreateSlot}/>
        <Route path="/admin/users" exact component={AdminViewUsers}/>
        <Route path="/admin/users/new" exact component={AdminCreateUser}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
