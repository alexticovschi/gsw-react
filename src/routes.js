import React from 'react';
import Layout from './HOC/Layout';
import { Switch } from 'react-router-dom';

import PrivateRoute from './Components/AuthRoutes/PrivateRoutes';
import PublicRoute from './Components/AuthRoutes/PublicRoutes';

import Home from './Components/Home';
import Login from './Components/Login';

import Dashboard from './Components/Admin/Dashboard';
import AdminGames from './Components/Admin/Games';

const Routes = (props) => {
  return (
    <Layout user={props.user}> 
      <Switch>
        <PrivateRoute {...props} exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute {...props} exact path="/admin_games" component={AdminGames}/>
        <PublicRoute {...props} restricted={true} exact path="/login" component={Login}/>
        <PublicRoute {...props} restricted={false} exact path="/" component={Home}/>
      </Switch> 
    </Layout>
  )
}

export default Routes;
