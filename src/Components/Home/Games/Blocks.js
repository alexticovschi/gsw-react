import React, { Component } from 'react';
import { firebaseGames } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../miscellaneous';

import GameBlock from '../../UI/GameBlock';
import Slide from 'react-reveal/Slide';

import './gameblock.css';

class Blocks extends Component {

    state = {
        games: []
    }

    componentDidMount() {
        firebaseGames.limitToLast(9).once('value')
            .then(data => {
                const games = firebaseLooper(data);

                this.setState({ 
                    games: reverseArray(games) 
                })
            })
    }

    displayGames = (games) => (
        games ? 
            games.map(game => (
                <Slide bottom key={game.id}>
                    <div className="wrapper">
                        <GameBlock game={game} />
                    </div>
                </Slide>
            ))
        : null
    );

    render() {
        const games = this.state.games;

        return (
            <div className="home_games">
                {this.displayGames(games)}
            </div>
        );
    }
}

export default Blocks;