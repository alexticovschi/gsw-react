import React, { Component } from 'react';
import PlayerCard from '../UI/PlayerCard/PlayerCard';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../../miscellaneous';
import { Promise } from 'core-js';

import './team.css';

class Team extends Component {

    state = {
        loading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value')
            .then(data => {
                const players = firebaseLooper(data);
                let promises = [];

                for(let key in players) {
                    // create a new promise and push it to promises array
                    promises.push(
                        // for each player, create a new promise, make a request to the server,
                        //  bring the download url for each player
                        new Promise((resolve, reject) => {
                            firebase.storage().ref('players')
                                .child(players[key].image).getDownloadURL()
                                .then(url => {
                                    players[key].url = url;
                                    resolve();
                                })
                        })
                    )
                }

                Promise.all(promises).then(() => {
                    this.setState({
                        loading: false,
                        players: players
                    })
                })

            })
    }
    
    showPlayersByCategory = (category) => (
        this.state.players ?
            this.state.players.map((player, i) => {
                return player.position === category ?
                    <Link className="item" to={`/player-info/${player.id}`} key={player.id}>
                        <Fade left delay={20*i}>
                            <div className="item">
                                <PlayerCard
                                    number={player.number}
                                    firstname={player.firstname}
                                    lastname={player.lastname}
                                    position={player.position}
                                    bck={player.url}
                                />
                            </div>
                        </Fade>
                    </Link>
                : null
            })
        : null
    )

    render() {
        console.log(this.state.players)
        return (
            <div className="team_container">
                {
                    !this.state.loading ?
                        <div>
                            <div className="team_category_wrapper">
                                <div className="title">Forwards</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Forward')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Guards</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Guard')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Centers</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Center')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Center-Forwards</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Center-Forward')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Guard-Forwards</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Guard-Forward')}
                                </div>
                            </div>
                        </div>

                    : null
                }
            </div>
        );
    }
}

export default Team;