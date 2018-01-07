import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import * as actions from '../../actions';

class Recents extends Component {
	componentDidMount() {
		if (this.props.spotifyWebApi) {
			const { spotifyWebApi } = this.props;
			this.props.fetchUser(spotifyWebApi);

			spotifyWebApi.getMyRecentlyPlayedTracks().then(response => {
				// debugger;
				console.log(JSON.stringify(response));
			});

			// if (this.props.user) {

			// }
		}
	}

	render() {
		const { user, isAuthenticated } = this.props;
		console.log(`user: ${user}`);
		console.log(`isAuthenticated: ${isAuthenticated}`);

		return (
			<React.Fragment>
				<h1>Recents Page!</h1>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { isAuthenticated, user, spotifyWebApi } = state.authentication;
	// debugger;
	return {
		isAuthenticated,
		user,
		spotifyWebApi
	};
}

export default withRouter(connect(mapStateToProps, actions)(Recents));
