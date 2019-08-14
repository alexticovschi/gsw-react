import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { firebaseLooper } from "../../miscellaneous";
import { Link } from "react-router-dom";

import { firebaseDB } from "../../firebase";

import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';


import "./nbaTeam.css";

class NbaTeam extends Component {
  state = {
    isLoading: false,
    id: null,
    players: []
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    const teamId = this.props.match.params.teamId;

    firebaseDB
      .ref(`teams/${teamId}`)
      .once("value")
      .then(data => {
        const teamData = data.val();

        this.setState({
          isLoading: false,
          id: teamData.teamId
        });

        if (this.state.id) {
          this.getPlayers(this.state.id);
        }
      });
  }

  getPlayers = async ID => {
    const resp = await fetch(
      `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${ID}`
    );

    const players = await resp.json();
    console.log(players);

    this.setState({ players: players.player });
  };

  displayPlayers = players =>
    players
      ? players.filter(player => player.strPosition !== "Manager").map((player, i) => (
          <Link to={`/nba-team/player/${player.idPlayer}`}>
            <Fade left delay={45*i} key={player.idPlayer}>
              <div className="wrapper">
                <div className="nba-player">
                  <div className="card-box-left">
                    <div className="nba-player-name">{player.strPlayer}</div>
                    <div className="nba-player-position">{player.strPosition}</div>
                  </div>
                  <Zoom delay={500}>
                    <img className="nba-player-logo" src={`${player.strCutout}`} />
                  </Zoom>
                </div>
              </div>
            </Fade>
          </Link>
        ))
      : null;

  render() {
    console.log(this.state);
    const players = this.state.players;

    return (
      <div className="back_grnd">
        <div className="nba_teams_container">
          {this.state.isLoading ? (
            <div className="nba_teams_wrapper">
              <div className="nba_teams_progress">
                <CircularProgress style={{ color: "#fff" }} />
              </div>
            </div>
          ) : (
            <div className="nba_team">{this.displayPlayers(players)}</div>
          )}
        </div>
      </div>
    );
  }
}

export default NbaTeam;
