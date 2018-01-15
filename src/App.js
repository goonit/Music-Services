import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
// import PropTypes from 'prop-types';
import './App.css';
import SpotifyIndex from './components/spotify/';
import Recents from './components/spotify/Recents';
import Favorites from './components/spotify/Favorites';
import Playlists from './components/spotify/Playlists';
import PlaylistDetail from './components/spotify/PlaylistDetail';
import Callback from './components/spotify/Callback';
import BottomNav from './components/BottomNav';
import PrivateRoute from './components/PrivateRoute';
import { setSpotifyApi, receiveLogin, fetchUser } from './actions';

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

	componentDidMount() {
		const { spotifyAccessToken, spotifyTokenExpiration } = this.props;
		// debugger;
		console.log(
			`moment: ${moment().format(
				'MM/DD/YYYY hh:mm:ss A'
			)}\nexpireMoment: ${moment(spotifyTokenExpiration).format(
				'MM/DD/YYYY hh:mm:ss A'
			)}`
		);
		if (
			spotifyAccessToken &&
			spotifyTokenExpiration &&
			spotifyAccessToken.length > 0 &&
			moment().isBefore(moment(spotifyTokenExpiration))
		) {
			this.props.receiveLogin(); // tell our app it is authenticated
			this.props.setSpotifyApi(); // set the spotifywebapi in state with our stored token so we can make api calls
			// debugger;
			// if (this.props.spotifyWebApi) {
			// 	this.props.fetchUser(this.props.spotifyWebApi);
			// }
		}
		if (this.props.spotifyWebApi) {
			this.props.fetchUser(this.props.spotifyWebApi);
		}
		// debugger;
	}

	componentWillReceiveProps(nextProps) {
		// debugger;
		// if (
		// 	nextProps.spotifyAccessToken &&
		// 	nextProps.spotifyTokenExpiration &&
		// 	nextProps.spotifyAccessToken.length > 0 &&
		// 	moment().isBefore(moment(nextProps.spotifyTokenExpiration))
		// ) {
		// 	this.props.receiveLogin(); // tell our app it is authenticated
		// 	this.props.setSpotifyApi(); // set the spotifywebapi in state with our stored token so we can make api calls
		// 	// debugger;
		// 	// if (this.props.spotifyWebApi) {
		// 	// 	this.props.fetchUser(this.props.spotifyWebApi);
		// 	// }
		// }
		// if (nextProps.spotifyWebApi && !this.props.spotifyWebApi) {
		// 	this.props.fetchUser(nextProps.spotifyWebApi);
		// }
	}

	render() {
		const { isAuthenticated } = this.props;

		// pass in current route as value prop to bottom navigation function.
		// this allows for navigating directly to a url (bookmarks) and the
		// correct navbuttonItem will be selected.
		const { pathname } = this.props.location;
		let currentRoute = pathname.split('/')[2];
		if (pathname === '/spotify') currentRoute = 'home';

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
					{!isAuthenticated ? (
						<div>you are not authenticated</div>
					) : (
						<div>authenticated!</div>
					)}
					<Route exact path="/spotify" component={SpotifyIndex} />
					<PrivateRoute
						exact
						path="/spotify/recents"
						component={Recents}
						isAuthenticated={this.props.isAuthenticated}
					/>
					<Route path="/spotify/callback" component={Callback} />
					<PrivateRoute
						path="/spotify/favorites"
						component={Favorites}
						isAuthenticated={this.props.isAuthenticated}
					/>
					<PrivateRoute
						exact
						path="/spotify/playlists"
						component={Playlists}
						isAuthenticated={this.props.isAuthenticated}
					/>
					<PrivateRoute
						path="/spotify/playlists/:id"
						component={PlaylistDetail}
						isAuthenticated={this.props.isAuthenticated}
					/>
				</div>
				<BottomNav value={currentRoute} />
			</div>
		);
	}
}

// App.propTypes = {
// user: PropTypes.object
// isAuthenticated: PropTypes.bool.isRequired,
// errorMessage: PropTypes.string
// };

function mapStateToProps(state) {
	const {
		user,
		isAuthenticated,
		spotifyAccessToken,
		spotifyTokenExpiration,
		spotifyWebApi
	} = state.authentication;

	return {
		user,
		isAuthenticated,
		spotifyAccessToken,
		spotifyTokenExpiration,
		spotifyWebApi
	};
}

export default withRouter(
	connect(mapStateToProps, { setSpotifyApi, receiveLogin, fetchUser })(App)
);
