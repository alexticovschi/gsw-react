import React from "react";
import { Link } from 'react-router-dom';
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import Button from '@material-ui/core/Button';
import gswlogo from '../../../Resources/images/logos/logo.png';

import "./Toolbar.css";

const Toolbar = props => {
  return (
  <header className="toolbar">
    <div className="toolbar-wrapper">
      <nav className="toolbar__navigation">
        <div className="toolbar__logo">
          <a href="/">
            <img src={gswlogo} alt="logo"/>
          </a>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <Link to='/'>
              <Button color='inherit'>Home</Button>
            </Link>
            <Link to='/team'>
              <Button color='inherit'>Team</Button>
            </Link>
            <Link to='/games'>
              <Button color='inherit'>Games</Button>
            </Link>
            <Link to='/nba-teams'>
              <Button color='inherit'>NBA Teams</Button>
            </Link>

            {
              !props.user ? (
                <Link to='/login'>
                  <Button color='inherit'>Login</Button>
                </Link>
              ) : (
                <Link to='/dashboard'>
                  <Button color='inherit'>Dashboard</Button>
                </Link>
              )
            }
          </ul>
        </div>
        <div className="toolbar__toggle-button">
          <DrawerToggleButton isOpen={props.isOpen} click={props.drawerClickHandler} />
        </div>
      </nav>
    </div>
  </header>
)};

export default Toolbar;
