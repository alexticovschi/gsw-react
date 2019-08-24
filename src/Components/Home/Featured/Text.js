import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import Kevin_Durant from '../../../Resources/images/kevin_durant.png';
import Stephen_Curry from '../../../Resources/images/stephen_curry5.png';
import Klay_Thompson from '../../../Resources/images/klay_thompson.png';

const Text = () => {
    const animatePlayer = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                rotate: [0]
            }}

            enter={{
                opacity: [1],
                rotate: [360],
                timing: {
                    delay: 800,
                    duration: 1000,
                    ease: easePolyOut
                }
            }}
        >
            {({ opacity, rotate }) => {
                return (
                    <div className="featured_players">   
                        <div className="featured_player left"
                            style={{
                                opacity,
                                background: `url(${Kevin_Durant})`
                            }}
                        >
            
                        </div>

                        <div className="featured_player middle"
                            style={{
                                opacity,
                                background: `url(${Stephen_Curry})`
                            }}
                        >
            
                        </div>

                        <div className="featured_player right"
                            style={{
                                opacity,
                                background: `url(${Klay_Thompson})`
                            }}
                        >
            
                        </div>
                    </div>
                )
            }}
        </Animate>
    )

    return (
        <div>
            <div className="featured_text">
                {animatePlayer()}
            </div>
                    
            {/* <div className="featured_txt">
                <div className="featured_first">Golden</div>
                <div className="featured_second">State Warriors</div>
            </div> */}
            
        </div>
    );
};

export default Text;