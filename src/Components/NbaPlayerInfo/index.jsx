import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import ShowMore from "react-show-more";

import "./nbaPlayerInfo.css";

class NbaPlayerInfo extends Component {
  state = {
    playerData: []
  };

  componentDidMount() {
    const { playerId } = this.props.match.params;

    this.getPlayer(playerId);
  }

  getPlayer = async ID => {
    const resp = await fetch(
      `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${ID}`
    );

    const playerData = await resp.json();

    this.setState({ playerData: playerData.players[0] });
  };

  render() {
    const { playerData } = this.state;

    return (
      <section className="nba-player-container">
        <div className="nba-player-card">
          <Fade delay={400}>
            <div className="nba-player-image-wrapper">
              <img src={playerData.strThumb} className="nba-player-image" alt="nba player"/>
            </div>
          </Fade>
          <div className="nba-player-info">
            <h3 className="nba-player-fullname">{playerData.strPlayer}</h3>
            <p className="nba-player-paragraph-1">
              <span>Nationality</span>: {playerData.strNationality}
            </p>
            <p className="nba-player-paragraph-1">
              <span>From</span>: {playerData.strBirthLocation}
            </p>
            <p className="nba-player-paragraph-1">
              <span>Born</span>: {playerData.dateBorn}
            </p>
            <p className="nba-player-paragraph-1">
              <span>Position</span>: {playerData.strPosition}
            </p>
            <p className="nba-player-paragraph-1">
              <span>Current Team</span>: {playerData.strTeam}
            </p>
            <p className="nba-player-paragraph-1">
              <span>Height</span>: {playerData.strHeight}
            </p>
            <p className="nba-player-paragraph-1">
              <span>Weight</span>: {playerData.strWeight}
            </p>
            {/* <p className="nba-player-paragraph-2">
              {playerData.strDescriptionEN}
            </p> */}
            <Fade delay={200}>
              <ShowMore
                lines={5}
                more="Show more"
                less="Show less"
                anchorClass="show-more-anchor"
              >
                <Fade>
                  <p className="nba-player-paragraph-2">
                    {playerData.strDescriptionEN}
                  </p>
                </Fade>
              </ShowMore>
            </Fade>
          </div>
        </div>
      </section>
    );
  }
}

export default NbaPlayerInfo;
