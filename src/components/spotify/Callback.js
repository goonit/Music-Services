import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import querystring from 'query-string';
import { loginError, receiveLogin, setSpotifyApi } from '../../actions';
import * as moment from 'moment';

class Callback extends Component {
	componentWillMount() {
		const { access_token, expires_in } = querystring.parse(
			window.location.hash
		);

		if (!access_token) {
			const { error } = querystring.parse(window.location.search);

			return this.props.loginError(error);
		}
		// todo: dispatch an action here passing the token to set in local storage.
		const authExpiration = moment().add(expires_in, 's');
		this.props.receiveLogin(access_token, authExpiration);

		// should this be moved to an action too?
		this.props.setSpotifyApi(access_token);
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

export default withRouter(
	connect(null, { loginError, receiveLogin, setSpotifyApi })(Callback)
);
