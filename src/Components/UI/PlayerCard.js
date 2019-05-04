import React from 'react';

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
                <div className="player_card_number">
                    {props.number}
                </div>
                <div className="player_card_name">
                    <div>{props.firstname}</div>
                    <div>{props.lastname}</div>
                </div>
                <div>{props.position}</div>
            </div>
        </div>
    );
};

export default PlayerCard;