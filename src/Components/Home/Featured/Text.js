import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import Kevin_Durant from '../../../Resources/images/kevin_durant.png';
import Stephen_Curry from '../../../Resources/images/stephen_curry5.png';
import Klay_Thompson from '../../../Resources/images/klay_thompson.png';

const Text = () => {
    const animateNumber = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                rotate: 0
            }}

            enter={{
                opacity: [1],
                rotate: [360],
                timing: {
                    duration: 1000,
                    ease: easePolyOut
                }
            }}
        >
            {({ opacity, rotate }) => {
                return (
                    <div className="featured_number"
                        style={{
                            opacity,
                            transform: `translate(-320px, -170px) rotateY(${rotate}deg)`
                        }}
                    >
                        
                    </div>
                )
            }}
        </Animate>
    );

    const animateFirst = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 1560,
                y: 450,
            }}

            enter={{
                opacity: [1],
                x: [573],
                y: [450],
                timing: {
                    duration: 1000,
                    ease: easePolyOut
                }
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div className="featured_first"
                        style={{
                            opacity,
                            transform: `translate(${x}px, ${y}px)`,
                            borderRadius: '10px'
                        }}
                    >
                        Golden
                    </div>
                )
            }}
        </Animate>
    );

    const animateSecond = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 2560,
                y: 586,
            }}

            enter={{
                opacity: [1],
                x: [573],
                y: [586],
                timing: {
                    delay: 300,
                    duration: 1000,
                    ease: easePolyOut
                }
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div className="featured_second"
                        style={{
                            opacity,
                            transform: `translate(${x}px, ${y}px)`,
                            borderRadius: '10px'
                        }}
                    >
                        State Warriors
                    </div>
                )
            }}
        </Animate>
    );

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
                    <div>   
                        <div className="featured_player"
                            style={{
                                opacity,
                                background: `url(${Kevin_Durant})`,
                                transform: `translate(-740px, -310px)`
                            }}
                        >
            
                        </div>

                        <div className="featured_player"
                            style={{
                                opacity,
                                background: `url(${Stephen_Curry})`,
                                transform: `translate(-230px, -390px)`
                            }}
                        >
            
                        </div>

                        <div className="featured_player"
                            style={{
                                opacity,
                                background: `url(${Klay_Thompson})`,
                                transform: `translate(270px, -340px)`
                            }}
                        >
            
                        </div>
                    </div>
                    // <div className="featured_player"
                    //     style={{
                    //         opacity,
                    //         background: `url(${FeaturedPlayer})`,
                    //         transform: `translate(-100px, -210px)`
                    //     }}
                    // >
        
                    // </div>
                )
            }}
        </Animate>
    )

    return (
        <div className="featured_text">
            {animatePlayer()}
            {/* {animateNumber()} */}
            {animateFirst()}
            {animateSecond()}
        </div>
    );
};

export default Text;