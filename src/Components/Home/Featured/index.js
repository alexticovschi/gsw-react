import React from 'react';
import Stripes from './Stripes';
import Text from './Text';
import Zoom from "react-reveal/Zoom";

import './featured.css';

const Featured = () => {
    return (
        <div className="featured_wrapper">
            <Stripes/>
            <Text/>

            
            <div className="gsw_text">
                <Zoom delay={800}>
                    <img src="/images/gsw.png" alt=""/>
                </Zoom>
            </div>
        </div>
        
    );
};

export default Featured;