import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login'
import Register from './pages/Register'

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
