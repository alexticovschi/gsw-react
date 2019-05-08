import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase';

const AdminNav = () => {

    const links = [
        {
            title: 'Games',
            linkTo: '/admin_games'
        },
        {
            title: 'Add Game',
            linkTo: '/admin_games/add_game'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/admin_players/add_player'
        }
    ]

    const styles = {
        color: '#fff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={styles}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    );

    const logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            console.log('YOU HAVE BEEN LOGGED OUT!');
        },(error) => {
            console.log('ERROR LOGGING OUT!');
        })
    }

    return (
        <div>
            {renderItems()}
            <ListItem button 
                style={styles}
                onClick={() => logoutHandler()}
                >
                Logout
            </ListItem>
        </div>
    );
};

export default AdminNav;