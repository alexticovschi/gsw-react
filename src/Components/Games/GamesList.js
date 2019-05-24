import React, { Component } from 'react';

class GamesList extends Component {

    state = {
        gamesList: []
    }

    static getDerivedStateFromProps(props, state) {
        return state = {
            gamesList: props.games
        }
    }

    render() {

        return (
            <div className="games_wrapper">
                GAMES LIST
            </div>
        );
    }
}

export default GamesList;