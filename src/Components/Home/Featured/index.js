import React from 'react';
import Stripes from './Stripes';
import Text from './Text';

import './featured.css';

const Featured = () => {
    return (
        <div className="featured_wrapper">
            <Stripes/>
            <Text/>

            <div className="gsw_text">
                <img src="/images/gsw.png" alt=""/>
            </div>
        </div>
        
    );
};

export default Featured;