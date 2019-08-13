import React, { Component } from "react";
import { Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseLooper } from "../../miscellaneous";

import { firebaseDB, firebaseTeams } from "../../firebase";

import Slide from "react-reveal/Slide";

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
      ? teams.map(team => (
          <Link to={`/nba-team/${team.id}`}>
            <Slide bottom key={team.teamId}>
              <div className="wrapper">
                <div className="game_block">
                  <div className="nba-team">
                    <div className="team-name">{team.name}</div>
                    {/* <div>{team.teamId}</div> */}
                    <img
                      className="team-logo"
                      src={`images/team_icons/${team.thmb}.svg`}
                    />
                  </div>
                </div>
              </div>
            </Slide>
          </Link>
        ))
      : null;

  render() {
    const teams = this.state.teams;

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
            <div className="nba_teams">{this.displayTeams(teams)}</div>
          )}
        </div>
      </div>
    );
  }
}

export default NbaTeams;
