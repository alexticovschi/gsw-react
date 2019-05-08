import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';

import Dashboard from './Components/Admin/Dashboard';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch> 
    </Layout>
  )
}

export default Routes;
