import React from 'react';
import Header from '../Components/Header';

const Layout = (props) => {
    return (
        <div>
            <Header/>
            {props.children}
            <div>FOOTER</div>
        </div>
    );
};

export default Layout;