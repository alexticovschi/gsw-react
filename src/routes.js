import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './Components/AuthRoutes/PrivateRoutes';
import PublicRoute from './Components/AuthRoutes/PublicRoutes';

import Home from './Components/Home';
import Login from './Components/Login';

import Dashboard from './Components/Admin/Dashboard';
import AdminGames from './Components/Admin/Games';
import AddEditGame from './Components/Admin/Games/AddEditGame';

const Routes = (props) => {
  return (
    <Layout user={props.user}> 
      <Switch>
        <PrivateRoute {...props} exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute {...props} exact path="/admin_games" component={AdminGames}/>
        <PrivateRoute {...props} exact path="/admin_games/edit_game/:id" component={AddEditGame}/>
        <PrivateRoute {...props} exact path="/admin_games/add_game" component={AddEditGame}/>
        <PublicRoute {...props} restricted={true} exact path="/login" component={Login}/>
        <PublicRoute {...props} restricted={false} exact path="/" component={Home}/>
      </Switch> 
    </Layout>
  )
}

export default Routes;
