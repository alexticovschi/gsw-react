import React from 'react';

import './playercard.css';

const PlayerCard = (props) => {
    return (
        <div className="player_card_wrapper">
            <div 
                className="player_card_thmb"
                style={{
                    background: `rgb(201, 229, 248) url(${props.bck})`
                }}
            >                
            </div>
            <div className="player_card_info">
                <div className="player_card_name">
                    <div className="player_card_name">
                        <div>{props.firstname} {props.lastname}</div>
                    </div>

                    <div className="position">{props.position}</div>
                </div>
                <div className="player_card_number">
                    {props.number}
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;