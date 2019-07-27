import React from 'react';
import StephenCurry from '../../../Resources/images/stephen-curry.png'
import PlayerCard from '../../UI/PlayerCard/PlayerCard';

const Card = () => {
    return (
        <div className="container_player_card">
            <PlayerCard
                number="30"
                firstname="Stephen"
                position="Guard"
                lastname="Curry"
                bck={StephenCurry}
            /> 
        </div>
    );
};

export default Card;