import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Recents from './components/spotify/';
import Favorites from './components/spotify/Favorites';
import Playlists from './components/spotify/Playlists';
import Callback from './components/spotify/Callback';
import BottomNav from './components/BottomNav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedIndex: 0
    };

    localStorage.setItem(
      'spotifyRedirectUri',
      'http://localhost:3000/spotify/callback'
    );
    localStorage.setItem('spotifyClientId', 'cdaa839c4f3446d4883e3529a89d6097');
    localStorage.setItem(
      'spotifyClientSecret',
      'bd9f1ac24eac478690d7e6ae98cac21b'
    );
    localStorage.setItem(
      'spotifyAuthScopes',
      'playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-top-read user-read-recently-played user-library-read user-library-modify streaming user-read-currently-playing user-modify-playback-state user-read-playback-state user-read-private'
    );
  }

  render() {
    const {
      dispatch,
      quote,
      isAuthenticated,
      errorMessage,
      isSecretQuote,
      spotifyWebApi
    } = this.props;

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Music Services App
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App-intro">
          <Route path="/spotify/recents" component={Recents} />
          <Route path="/spotify/callback" component={Callback} />
          <Route path="/spotify/favorites" component={Favorites} />
          <Route path="/spotify/playlists" component={Playlists} />
        </div>
        <BottomNav />
      </div>
    );
  }
}

App.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { user, auth } = state;
  const { authenticated } = user;
  const { isAuthenticated, errorMessage } = auth;
  const { spotifyWebApi } = state;

  return {
    user,
    isAuthenticated,
    errorMessage,
    spotifyWebApi
  };
}

export default connect(mapStateToProps)(App);
