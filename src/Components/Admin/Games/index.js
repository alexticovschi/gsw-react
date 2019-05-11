import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseGames } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../miscellaneous';


class AdminGames extends Component {

    state = {
        isLoading: true,
        games: []
    }

    componentDidMount() {
        firebaseGames.once('value').then(data => {
            const games = firebaseLooper(data);

            this.setState({
                isLoading: false,
                games: reverseArray(games)
            })
        });
    }

    render() {
        return (
            <AdminLayout>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.games ?
                                    this.state.games.map((game, i) => (
                                        <TableRow key={i}>

                                            <TableCell>
                                                { game.date }
                                            </TableCell>

                                            <TableCell>
                                                <Link to={`/admin_games/edit_game/${game.id}`}>
                                                    { game.away } <strong>-</strong> { game.local }
                                                </Link>
                                            </TableCell>

                                            <TableCell>
                                                { game.resultAway} <strong>-</strong> {game.resultLocal }
                                            </TableCell>

                                            <TableCell>
                                                { game.final === "Yes" ?
                                                    <span className="matches_tag_red">Final</span>
                                                    :
                                                    <span className="matches_tag_green">Not played yet</span>
                                                }
                                            </TableCell>

                                        </TableRow>
                                    ))
                                : null
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <div className="admin_progress">
                    {
                        this.state.isLoading ? 
                            <CircularProgress size={60} thickness={6} style={{color:'#FDB927'}}/>
                        : null
                    }
                </div>
            </AdminLayout>
        );
    }
}

export default AdminGames;