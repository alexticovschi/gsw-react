import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import StephenCurry from '../../../Resources/images/stephen-curry.png'
import PlayerCard from '../../UI/PlayerCard';

class HomeCards extends Component {

    state = {
        show: this.props.show,
        cards: [
            {
                bottom: -340,
                left: 120
            },
            {
                bottom: 30,
                left: 60
            },
            {
                bottom: 400,
                left: 0
            }
        ]
    }

    animateCards = () => (
        this.state.cards.map((card, i) => (
            <Animate
                key={i}
                show={this.props.show}

                start={{
                    left: 0,
                    bottom: 0,
                }}

                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: { 
                        duration: 1300, 
                        ease: easePolyOut 
                    }
                }}
            >
                {({ left, bottom })=>{
                    return (
                        <div
                            style={{
                                position: 'relative',
                                left,
                                bottom
                            }}
                        >
                            <PlayerCard
                                number="30"
                                firstname="Stephen"
                                lastname="Curry"
                                bck={StephenCurry}
                            />    
                       </div>
                    )
                }}
            </Animate>
        ))
    )

    render() {
        return (
            <div className="container_player_card">
                {this.animateCards()}
            </div>
        );
    }
}

export default HomeCards;