import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import * as actions from '../../actions/';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import PlayDashList from '../Play-List';

class Playlists extends Component {
	state = {
		playlists: []
	};
	componentDidMount() {
		this.props.spotifyWebApi
			.getUserPlaylists(this.props.user.id)
			.then(response => {
				console.log(`playlists type: ${typeof response.items}`);
				this.setState({ playlists: response.items });
			});
	}

	render() {
		debugger;

		const { playlists } = this.state;

		return (
			<React.Fragment>
				<h1>Playlists!</h1>
				<List className={styles.root}>
					{playlists.map(playlist => {
						let showDivider =
							playlists.indexOf(playlist) !== playlists.length - 1;
						return (
							<ListItem key={playlist.id} divider={showDivider}>
								<ListItemText primary={playlist.name} />
							</ListItem>
						);
					})}
				</List>
			</React.Fragment>
		);
	}
}

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: '360px',
		backgroundColor: theme.palette.background.paper
	}
});

function mapStateToProps(state) {
	const { user, spotifyWebApi } = state.authentication;
	debugger;

	return {
		user,
		spotifyWebApi
	};
}

export default withRouter(connect(mapStateToProps, actions)(Playlists));
