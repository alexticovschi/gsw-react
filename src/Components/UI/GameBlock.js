import React from 'react';

const GameBlock = ({ game }) => {


    return (
        <div className="game_block">
            <div className="scoreboard"> 
                <div className="date">{game.date}</div>
                <div className="team">
                    <img className="logo" src={`images/team_icons/${game.localThmb}.svg`}></img>
                    <div className="name">{game.local}</div>
                    <div className={game.result === 'W' ? `score win` : 'score'}>{game.resultLocal}</div>
                </div>
                <div className="divider"></div>
                <div className="team">
                    <img className="logo" src={`images/team_icons/${game.awayThmb}.svg`}></img>
                    <div className="name">{game.away}</div>
                    <div className={game.result === 'L' ? `score lose` : 'score'}>{game.resultAway}</div>
                </div>
            </div>
        </div>
    );
};

export default GameBlock;