import React from 'react';

const Layout = (props) => {
    return (
        <div>
            <div>HEADER</div>
            {props.children}
            <div>FOOTER</div>
        </div>
    );
};

export default Layout;