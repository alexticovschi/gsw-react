import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseGames } from '../../firebase';
import { firebaseLooper, reverseArray } from '../../miscellaneous';

import GamesList from './GamesList';

class Games extends Component {
 
    state = {
        loading: true,
        games: [],
        filterGames: [],
        playedFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount() {
        firebaseGames.once('value').then(data => {
            const games = firebaseLooper(data);

            this.setState({ 
                loading: false,
                games: reverseArray(games),
                filterGames: reverseArray(games)
            });
        })
    }

    render() {
        const state = this.state;

        return (
            <div className="games_container">
                <div className="games_wrapper">
                    <div>
                        <div className="game_filters">
                            <div className="game_filters_box">
                                
                            </div>

                            <div className="game_filters_box">
                                
                            </div>
                        </div>
                        <GamesList games={this.state.filterGames}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Games;