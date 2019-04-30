import React from 'react';
import { Link } from 'react-router-dom';

import gswlogo from '../../Resources/images/logos/logo.png';

export const Logo = (props) => {
    const template = (
        <div 
            className="img_cover"
            style={{
                width: props.width,
                height: props.height,
                background: `url(${gswlogo}) no-repeat`
            }}
        >
        </div>
    );

    if (props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return template;
    }
}