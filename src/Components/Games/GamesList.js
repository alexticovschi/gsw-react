import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

class GamesList extends Component {

    state = {
        gamesList: []
    }

    static getDerivedStateFromProps(props, state) {
        return state = {
            gamesList: props.games
        }
    }

    showMatches = () => (
        this.state.gamesList ? 
            <NodeGroup
                data={this.state.gamesList}
                keyAccessor={(d) => d.id}

                start={() => ({
                    opacity: 0,
                    x: -200,
                })}

                enter={(d,i) => ({
                    opacity: [1],
                    x: [0],
                    timing: {
                        duration: 500,
                        delay: i * 50,
                        ease: easePolyOut
                    }
                })}

                update={(d,i) => ({
                    opacity: [1],
                    x: [0],
                    timing: {
                        duration: 500,
                        delay: i * 50,
                        ease: easePolyOut
                    }
                })}

                leave={(d,i) => ({
                    opacity: [0],
                    x: [-200],
                    timing: {
                        duration: 500,
                        delay: i * 50,
                        ease: easePolyOut
                    }
                })}
            >
                {(nodes) => (
                    <div>
                        {nodes.map(({ key, data, state:{ x, opacity }}) => (
                            <div 
                                key={key} 
                                className="game_box_big"
                                style={{
                                    opacity,
                                    transform: `translate(${x}px)`
                                }}
                            >
                                <div className="block_wrapper">
                                    <div className="block">
                                        <div className="icon" style={{background: `url(/images/team_icons/${data.localThmb}.svg)`}}>
                                        
                                        </div>

                                        <div className="team">{data.local}</div>
                                        <div className={data.result === 'W' ? `result home_won` : 'result'}>{data.resultLocal}</div>
                                    </div>

                                    <div className="block">
                                        <div className="icon" style={{background: `url(/images/team_icons/${data.awayThmb}.svg)`}}>
                                        
                                        </div>

                                        <div className="team">{data.away}</div>
                                        <div className={data.result === 'L' ? `result away_won` : 'result'}>{data.resultAway}</div>
                                    </div>
                                </div>

                                <div className="block_wrapper info">
                                    <div><span>Date:</span> {data.date}</div>
                                    <div><span>Arena:</span> {data.arena}</div>
                                </div>

                                <div className="game_recap">
                                    Game Recap
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </NodeGroup>
        : null
    )
    

    render() {
        return (
            <div className="games_wrapper">
                {this.showMatches()}
            </div>
        );
    }
}

export default GamesList;