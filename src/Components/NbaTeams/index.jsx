import React, { Component } from "react";
import { Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseLooper } from "../../miscellaneous";

import { firebaseTeams } from "../../firebase";

import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import "./nbaTeams.css";

class NbaTeams extends Component {
  state = {
    isLoading: false,
    teams: []
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    firebaseTeams.once("value").then(data => {
      const teams = firebaseLooper(data);

      console.log(teams);

      this.setState({
        teams,
        isLoading: false
      });
    });
  }

  displayTeams = teams =>
    teams
      ? teams.map((team, i) => (
          <Link to={`/nba-team/${team.id}`}>
            <Fade right delay={20 * i} key={team.teamId}>
              <div className="wrapper">
                <div className="game_block">
                  <div className="nba-team-box">
                    <div className="team-name">{team.name}</div>

                    <Zoom delay={500}>
                      <img
                        className="team-logo"
                        src={`images/team_icons/${team.thmb}.svg`}
                      />
                    </Zoom>
                  </div>
                </div>
              </div>
            </Fade>
          </Link>
        ))
      : null;

  render() {
    const teams = this.state.teams;

    return (
      <div className="backgrnd">
        <div className="nba-teams_container">
          {this.state.isLoading ? (
            <div className="nba-teams-wrapper">
              <div className="nba-teams-progress">
                <CircularProgress style={{ color: "#fff" }} />
              </div>
            </div>
          ) : (
            <div className="nba-teams">{this.displayTeams(teams)}</div>
          )}
        </div>
      </div>
    );
  }
}

export default NbaTeams;
