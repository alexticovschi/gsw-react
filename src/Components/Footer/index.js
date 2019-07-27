import React from 'react';
import { Logo } from '../UI/Logo'

import './footer.css';

const Footer = () => {
    return (
        <footer className="dark_blue">
            <div className="footer_logo">
                <Logo
                    link={true} 
                    linkTo="/" 
                    width="70px"
                    height="70px"
                />
            </div>
            <div className="footer_discl">
                Golden State Warriors 2019.  All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;