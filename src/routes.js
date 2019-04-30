import React from 'react';
import Layout from './HOC/Layout';

const Routes = (props) => {
  return (
    <Layout>
      {props.children}
    </Layout>
  )
}

export default Routes;
