import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Recents extends Component {
	componentDidMount() {
		if (this.props.spotifyWebApi) {
			const { spotifyWebApi } = this.props;
			this.props.fetchUser(spotifyWebApi);

			spotifyWebApi.getMyRecentlyPlayedTracks().then(response => {
				console.log(JSON.stringify(response));
			});
		}
	}

	render() {
		const { user, isAuthenticated } = this.props;
		console.log(`user: ${JSON.stringify(user)}`);
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
	return {
		isAuthenticated,
		user,
		spotifyWebApi
	};
}

export default withRouter(connect(mapStateToProps, actions)(Recents));
