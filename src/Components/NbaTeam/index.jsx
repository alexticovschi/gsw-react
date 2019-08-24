import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { firebaseLooper } from "../../miscellaneous";
import { Link } from "react-router-dom";

import { firebaseDB } from "../../firebase";

import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import "./nbaTeam.css";

class NbaTeam extends Component {
  state = {
    isLoading: false,
    id: null,
    teamName:  null,
    players: [],
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
          id: teamData.teamId,
          teamName: teamData.name
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

    this.setState({ players: players.player });
  };

  displayPlayers = players =>
    players
      ? players
          .filter(player => player.strPosition !== "Manager")
          .map((player, i) => (
            <Link to={`/nba-team/player/${player.idPlayer}`} key={player.idPlayer}>
              <Fade left delay={45 * i}>
                <div className="wrapper">
                  <div className="nba-player">
                    <div className="card-box-left">
                      <div className="nba-player-name">{player.strPlayer}</div>
                      <div className="nba-player-position">
                        {player.strPosition}
                      </div>
                    </div>
                    <Zoom delay={500}>
                      <img
                        className="nba-player-logo"
                        src={`${player.strCutout}`}
                        alt="nba player logo"
                      />
                    </Zoom>
                  </div>
                </div>
              </Fade>
            </Link>
          ))
      : null;

  render() {
    const players = this.state.players;
    const teamName = this.state.teamName;

    return (
      <div className="backgrnd">
        <Zoom>
          <h1 className="team-name-title">{teamName}</h1>
        </Zoom>
        <div className="nba-teams-container">
          {this.state.isLoading ? (
            <div className="nba-teams-wrapper">
              <div className="nba-teams-progress">
                <CircularProgress style={{ color: "#fff" }} />
              </div>
            </div>
          ) : (
            <div className="nba-team">
              {this.displayPlayers(players)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NbaTeam;
