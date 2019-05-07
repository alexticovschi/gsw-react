import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch> 
    </Layout>
  )
}

export default Routes;
