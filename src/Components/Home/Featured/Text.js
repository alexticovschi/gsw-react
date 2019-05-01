import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import FeaturedPlayer from '../../../Resources/images/stephen_curry3.png';

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
                        30
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
                            transform: `translate(${x}px, ${y}px)`
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
                            transform: `translate(${x}px, ${y}px)`
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
                opacity: 0
            }}

            enter={{
                opacity: [1],
                timing: {
                    delay: 800,
                    duration: 1000,
                    ease: easePolyOut
                }
            }}
        >
            {({ opacity }) => {
                return (
                    <div className="featured_player"
                        style={{
                            opacity,
                            background: `url(${FeaturedPlayer})`,
                            transform: `translate(-100px, -210px)`
                        }}
                    >
                        
                    </div>
                )
            }}
        </Animate>
    )

    return (
        <div className="featured_text">
            {animatePlayer()}
            {animateNumber()}
            {animateFirst()}
            {animateSecond()}
        </div>
    );
};

export default Text;