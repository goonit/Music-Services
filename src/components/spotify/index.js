import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import querystring from 'query-string';
import * as actions from '../../actions';
import SpotifyWebApi from 'spotify-web-api-js';

class SpotifyIndex extends Component {
	state = {
		baseUri: '',
		queryStringParams: ''
	};

	generateRandomString = length => {
		var text = '';
		var possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

	callRequestLoginActionCreator = dispatch => {
		console.log('calling requestlogin action creator');
		// this.props.requestLogin();
	};

	componentDidMount() {
		// todo: move this into an action creator.
		const clientId = localStorage.getItem('spotifyClientId');
		// const clientSecret = localStorage.getItem('spotifyClientSecret');
		const redirectUri = localStorage.getItem('spotifyRedirectUri');
		const scope = localStorage.getItem('spotifyAuthScopes');

		let baseUri = 'https://accounts.spotify.com/authorize?';
		// let queryStringParams = `client_id=${clientId}
		// &response_type=code&
		// scope=${encodeURI(scope)}
		// &redirect_uri=${redirectUri}
		// &state=${this.generateRandomString(16)}`;

		this.setState({
			spotifyAuthUri:
				baseUri +
				querystring.stringify({
					response_type: 'token',
					client_id: clientId,
					scope,
					redirect_uri: redirectUri,
					state: this.generateRandomString(16)
				})
		});

		debugger;
		if (this.props.isAuthenticated) {
			let me = this.props.spotifyWebApi.getMe();
			console.log(me);
		}
	}

	render() {
		const { isAuthenticated } = this.props;
		let link = null;

		if (!isAuthenticated) {
			link = (
				<a
					href={this.state.spotifyAuthUri}
					style={{ textDecorationLine: 'none' }}
				>
					<Button raised>
						Login With Spotify&nbsp;&nbsp;<i
							className="fa fa-spotify fa-lg"
							aria-hidden="true"
						/>
					</Button>
				</a>
			);
		}

		return (
			<React.Fragment>
				<h1>Spotify Index</h1>
				{link}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { user, isAuthenticated, spotifyWebApi } = state.authentication;
	debugger;

	return {
		user,
		isAuthenticated,
		spotifyWebApi
	};
}

export default withRouter(connect(mapStateToProps, actions)(SpotifyIndex));
