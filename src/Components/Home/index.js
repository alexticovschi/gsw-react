import React from 'react';
import Featured from './Featured';
import Games from './Games';
import HomePlayer from './HomePlayer';

const Home = () => {
    return (
        <div className="bsk_blue">
            <Featured/>
            <Games/>
            <HomePlayer/>
        </div>
    );
};

export default Home;