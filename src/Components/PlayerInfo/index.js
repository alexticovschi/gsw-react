import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseDB, firebase } from '../../firebase';
import Fade from "react-reveal/Fade";

import './style.css';

class PlayerInfo extends Component {
    state = {
        isLoading: false,
        playerInfo: [], 
        playerImgURL: '', 
        defaultImg: ''
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        const playerId = this.props.match.params.id;
        
        firebaseDB.ref(`players/${playerId}`).once('value')
                .then(data => {
                    const playerData = data.val();
                    
                    firebase.storage().ref('players')
                        .child(playerData.image)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ 
                                playerImgURL: url
                            })
                        }).catch(error => {
                            
                        })
                    this.setState({ 
                        isLoading: false,
                        playerInfo: playerData
                    });
                })   
    }


    render() {
        const playerInfo = this.state.playerInfo;

        return (
            <div className="player_info_wrapper">
                {
                    this.state.isLoading ? 
                        <div className="player_info_progress">
                            <CircularProgress style={{color:'#FDB927'}}/>
                        </div>
                    : 
                        <div className="card_wrapper">
                            <div className="card">

                                <div className="card-thumb">
                                    <Fade delay={200}>
                                        <div>
                                            <img className="gsw_logo" src="/images/gsw_logo.png" alt="gsw logo"/>
                                            <img className="player_img" src={this.state.playerImgURL} alt="player"/>
                                        </div>
                                    </Fade>
                                </div>

                                <div class="card-content">
                                    <div className="card-content-info">
                                        <h2 className="player-name">{playerInfo.firstname} {playerInfo.lastname}</h2>
                                    

                                        <div className="card-info">
                                            <span>HEIGHT:</span>
                                            <span>{playerInfo.height}</span>
                                        </div>

                                        <div className="card-info">
                                            <span>WEIGHT: </span>
                                            <span>{playerInfo.weight} lbs</span>
                                        </div>

                                        <div className="card-info">
                                            <span>BORN: </span>
                                            <span>{playerInfo.born}</span>
                                        </div>
                                        <div className="card-info">
                                            <span>AGE: </span>
                                            <span>{playerInfo.age} years</span>
                                        </div>
                                        <div className="card-info">                                           
                                            <span>FROM: </span>
                                            <span>{playerInfo.from}</span>
                                        </div>
                                        <div className="card-info">
                                            <span>NBA DEBUT: </span>
                                            <span>{playerInfo.debut}</span>
                                        </div>
                                        <div className="card-info">
                                            <span>YEARS IN NBA: </span>
                                            <span> {playerInfo.years_in_nba}</span>
                                        </div>
                                        <div className="card-info">
                                            <span>PREVIOUSLY: </span>
                                            <span className="previously" style={{"width":"141px"}}>{playerInfo.previously}</span>
                                        </div>

                                    </div>
                                </div>
                                
                            </div>                        
                        </div>
                }
            </div>
        );
    }
}

export default PlayerInfo;