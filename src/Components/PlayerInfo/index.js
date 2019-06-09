import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseDB, firebase } from '../../firebase';

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
                            <img className="gsw_logo" src="/images/gsw_logo.png" alt=""/>

                            <div class="card">

                                <div class="card-thumb">
                                    <img src={this.state.playerImgURL} />
                                </div>

                                <div class="card-content">
                                    <div className="card-content-info">
                                        <h2>{playerInfo.firstname} {playerInfo.lastname}</h2>
                                    

                                        <div class="card-info">
                                            <span>HEIGHT:</span>
                                            <span>{playerInfo.height} ft</span>
                                        </div>

                                        <div class="card-info">
                                            <span>WEIGHT: </span>
                                            <span>{playerInfo.weight} lbs</span>
                                        </div>

                                        <div class="card-info">
                                            <span>BORN: </span>
                                            <span>{playerInfo.born}</span>
                                        </div>
                                        <div class="card-info">
                                            <span>AGE: </span>
                                            <span>{playerInfo.age} years</span>
                                        </div>
                                        <div class="card-info">                                           
                                            <span>FROM: </span>
                                            <span>{playerInfo.from}</span>
                                        </div>
                                        <div class="card-info">
                                            <span>NBA DEBUT: </span>
                                            <span>{playerInfo.debut}</span>
                                        </div>
                                        <div class="card-info">
                                            <span>YEARS IN NBA: </span>
                                            <span> {playerInfo.years_in_nba}</span>
                                        </div>
                                        <div class="card-info">
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