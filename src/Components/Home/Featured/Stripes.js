import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

class Stripes extends Component {

    state = {
        stripes: [
            {
                background: '#FDB927',
                rotate: 0,
                delay: 50
            },
            {
                background: '#006BB6',
                rotate: 0,
                delay: 300
            },
            {
                background: '#FDB927',
                rotate: 0,
                delay: 500
            }
        ]
    }
  
    showStripes = () => (
        this.state.stripes.map(( stripe, i ) => (
            <Animate
                key={i}
                show={true}

                start={{
                    background:'#fff',
                    opacity: 0,
                    left: 0,
                    rotate: 0,
                    top: 0
                }}

                enter={{
                    background: [stripe.background],
                    opacity: [1],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    top: [stripe.top],
                    timing: {
                        delay: [stripe.delay],
                        duration: 200,
                        ease: easePolyOut
                    },
                    events: {
                        end() {
                            // console.log('animation finished')
                        }
                    }
                }}
            >
                {({ left, opacity, rotate, top, background }) => {
                    return (
                        <div
                            className="stripe"
                            style={{
                                background,
                                opacity,
                                transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`,
                            }}
                        >
                        </div>
                    )
                }}
            </Animate>
        ))
    )

    render() {
        return (
        <div className="featured_stripes">
            {this.showStripes()}
        </div>
        )
    }
}

export default Stripes;