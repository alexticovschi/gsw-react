import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './Components/AuthRoutes/PrivateRoutes';
import PublicRoute from './Components/AuthRoutes/PublicRoutes';

import Home from './Components/Home';
import Team from './Components/Team';
import Games from './Components/Games';
import Login from './Components/Login';
import PlayerInfo from './Components/PlayerInfo';
import NbaTeam from './Components/NbaTeam';
import NbaTeams from './Components/NbaTeams';

import NotFound from './Components/UI/NotFound';

import Dashboard from './Components/Admin/Dashboard';
import AdminGames from './Components/Admin/Games';
import AddEditGame from './Components/Admin/Games/AddEditGame';
import AdminPlayers from './Components/Admin/Players';
import AddEditPlayer from './Components/Admin/Players/AddEditPlayer';

const Routes = (props) => {
  return (
    <Layout user={props.user}> 
      <Switch>
        <PrivateRoute {...props} exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute {...props} exact path="/admin_games" component={AdminGames}/>
        <PrivateRoute {...props} exact path="/admin_games/edit_game/:id" component={AddEditGame}/>
        <PrivateRoute {...props} exact path="/admin_games/add_game" component={AddEditGame}/>
        <PrivateRoute {...props} exact path="/admin_players" component={AdminPlayers}/>
        <PrivateRoute {...props} exact path="/admin_players/edit_player/:id" component={AddEditPlayer}/>
        <PrivateRoute {...props} exact path="/admin_players/add_player" component={AddEditPlayer}/>

        <PublicRoute {...props} restricted={true} exact path="/login" component={Login}/>
        <PublicRoute {...props} restricted={false} exact path="/nba-team/:teamId" component={NbaTeam}/>
        <PublicRoute {...props} restricted={false} exact path="/nba-teams" component={NbaTeams}/>
        <PublicRoute {...props} restricted={false} exact path="/player-info/:id" component={PlayerInfo}/>
        <PublicRoute {...props} restricted={false} exact path="/team" component={Team}/>
        <PublicRoute {...props} restricted={false} exact path="/games" component={Games}/>
        <PublicRoute {...props} restricted={false} exact path="/" component={Home}/>
        <PublicRoute {...props} restricted={false} component={NotFound} />
      </Switch> 
    </Layout>
  )
}

export default Routes;
