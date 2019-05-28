import React from 'react';
import Featured from './Featured';
import Games from './Games';
import HomePlayer from './HomePlayer';
import Promotion from './Promotion';

const Home = () => {
    return (
        <div className="bsk_blue">
            <Featured/>
            <Games/>
            {/* <HomePlayer/> */}
            <Promotion/>
        </div>
    );
};

export default Home;