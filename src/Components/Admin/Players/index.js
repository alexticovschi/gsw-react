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

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../miscellaneous';

class AdminPlayers extends Component {
    state = {
        isLoading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value').then(data => {
            const players = firebaseLooper(data);

            this.setState({
                isLoading: false,
                players: reverseArray(players)
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
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.players ?
                                    this.state.players.map((player, i) => (
                                        <TableRow key={i}>

                                            <TableCell>
                                                <Link to={`/admin_players/edit_player/${player.id}`}>
                                                    {player.firstname}
                                                </Link>
                                            </TableCell>

                                            <TableCell>
                                                <Link to={`/admin_players/edit_player/${player.id}`}>
                                                    <strong>{player.lastname}</strong>
                                                </Link>
                                            </TableCell>

                                            <TableCell>
                                                {player.number}
                                            </TableCell>

                                            <TableCell>
                                                {player.position}
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
                            <CircularProgress style={{color:'#FDB927'}}/>
                        : null
                    }
                </div>
            </AdminLayout>
        );
    }
}

export default AdminPlayers;