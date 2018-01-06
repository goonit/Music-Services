import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import querystring from 'query-string';
import * as SpotifyWebApi from 'spotify-web-api-js';
import * as actions from '../../actions';

class Callback extends Component {
	componentWillMount() {
		const { access_token } = querystring.parse(window.location.hash);

		// debugger;

		if (!access_token) {
			const { error } = querystring.parse(window.location.search);

			return this.props.loginError(error);
		}
		// todo: dispatch an action here passing the token to set in local storage.
		this.props.receiveLogin(access_token);
		// localStorage.setItem('spotifyAccessToken', access_token);

		// should this be moved to an action too?
		this.props.setApiAndKey();
		// var webApi = new SpotifyWebApi();
		// webApi.setAccessToken(access_token);
		// debugger;
		// this.props.postAuthRedirect();
		// window.location.href = window.location.origin;
		// this.props.fetchUser(this.props.spotifyWebApi);
	}

	render() {
		return (
			<React.Fragment>
				<h1>Callback Page!</h1>
				<Redirect to="/spotify/recents" />
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { spotifyWebApi, user, isAuthenticated } = state.authentication;

	return { spotifyWebApi, user, isAuthenticated };
}

export default withRouter(connect(mapStateToProps, actions)(Callback));
