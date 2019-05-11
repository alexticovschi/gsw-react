import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { Logo } from '../UI/Logo';


class Header extends Component {
    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor:'#FDB927',
                    boxShadow: 'none',
                    padding:"6px 0", 
                    borderBottom: '2px solid #26282A'
                }}
              
            >
                <Toolbar style={{ display:'flex' }}>
                    <div style={{ flexGrow: 1 }}>
                        <div className="link_logo">
                            <Logo 
                                link={true} 
                                linkTo="/" 
                                width="70px"
                                height="70px"
                            />
                        </div>
                    </div>

                    <Link to='/team'>
                        <Button color='inherit'>Team</Button>
                    </Link>
                    <Link to='/games'>
                        <Button color='inherit'>Games</Button>
                    </Link>
                    
                    {
                        !this.props.user ? (
                            <Link to='/login'>
                                <Button color='inherit'>Login</Button>
                            </Link>
                        ) : 
                        (
                            <Link to='/dashboard'>
                                <Button color='inherit'>Dashboard</Button>
                            </Link>
                        )
                    }
      
            
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;