import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import SpotifyIndex from './components/spotify/';
import Recents from './components/spotify/Recents';
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
		const { isAuthenticated, errorMessage, spotifyWebApi } = this.props;

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
					<Route exact path="/spotify" component={SpotifyIndex} />
					<Route exact path="/spotify/recents" component={Recents} />
					<Route path="/spotify/callback" component={Callback} />
					<Route path="/spotify/favorites" component={Favorites} />
					<Route path="/spotify/playlists" component={Playlists} />
				</div>
				<BottomNav />
			</div>
		);
	}
}

App.propTypes = {
	// user: PropTypes.object
	// isAuthenticated: PropTypes.bool.isRequired,
	// errorMessage: PropTypes.string
};

function mapStateToProps(state) {
	const { user, auth, spotifyWebApi } = state.authentication;
	// const { authenticated } = user;
	// const { isAuthenticated, errorMessage } = auth;

	console.log(`state: ${state}`);

	return {
		user,
		// isAuthenticated,
		// errorMessage,
		spotifyWebApi
	};
}

export default withRouter(connect(mapStateToProps)(App));
