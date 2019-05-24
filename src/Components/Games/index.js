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

    showPlayed = (played) => {
        // filter games
        const filteredList = this.state.games.filter(game => {
            return game.final === played
        })

        this.setState({
            filterGames: played === 'All' ? this.state.games : filteredList,
            playedFilter: 'All',
            resultFilter: played
        })
    }

    showResult = (result) => {
        const filteredList = this.state.games.filter(game => {
            return game.result === result
        })

        this.setState({
            filterGames: result === 'All' ? this.state.games : filteredList,
            playedFilter: 'All',
            resultFilter: result
        })
    }

    render() {
        const state = this.state;
        console.log(state.resultFilter)
        return (
            <div className="games_container">
                <div className="games_wrapper">
                    <div>
                        <div className="game_filters">
                            <div className="game_filters_box left">
                                <div className="tag">
                                    Show Game
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.resultFilter === 'All' ? 'active' : null}`}
                                        onClick={() => this.showPlayed('All')}>
                                        All
                                    </div>
                                    <div className={`option ${state.resultFilter === 'Yes' ? 'active' : null}`}
                                        onClick={() => this.showPlayed('Yes')}>
                                        Played
                                    </div>
                                    <div className={`option ${state.resultFilter === 'No' ? 'active' : null}`}
                                        onClick={() => this.showPlayed('No')}>
                                        Not Played
                                    </div>
                                </div>
                            </div>

                            <div className="game_filters_box right">
                                <div className="tag">
                                    Game Results
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.resultFilter === 'All' ? 'active' : null}`}
                                        onClick={() => this.showResult('All')}>
                                        All
                                    </div>
                                    <div className={`option ${state.resultFilter === 'W' ? 'active' : null}`}
                                        onClick={() => this.showResult('W')}>
                                        Wins
                                    </div>
                                    <div className={`option ${state.resultFilter === 'L' ? 'active' : null}`}
                                        onClick={() => this.showResult('L')}>
                                        Losses
                                    </div>
                                </div>
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