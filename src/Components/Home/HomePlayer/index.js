import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal';
import HomeCard from './Card';

import './homeplayer.css';

class HomePlayers extends Component {

    state = {
        show: false
    }

    render() {
        return (
            <Reveal
                fraction={0.7}

                onReveal={()=>{
                    this.setState({ show:true })
                }}
            >
                <div className="home_player">
                    <div className="container">
                        <div className="home_player_wrapper">
                            <div className="home_card_wrapper">
                                <HomeCard
                                    show={this.state.show}
                                />
                            </div>
                            <div className="home_text_wrapper">
                                <div className="tags tag1">Meet</div>
                                <div className="tags tag2">The Players</div>

                                <Link to="/team">
                                    <div className="tag3">&rarr; Meet Them Here</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
}

export default HomePlayers;