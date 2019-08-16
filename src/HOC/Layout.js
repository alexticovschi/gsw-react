import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer';

const Layout = (props) => {
    return (
        <div> 
            <Navbar user={props.user}/>
                {props.children}
            <Footer/>
        </div>
    );
};

export default Layout;