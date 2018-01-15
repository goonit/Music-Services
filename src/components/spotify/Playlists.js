import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/';
import List, { ListItem, ListItemText } from 'material-ui/List';
// import PlayDashList from '../Play-List';

class Playlists extends Component {
	state = {
		playlists: []
	};
	componentDidMount() {
		this.props.spotifyWebApi
			.getUserPlaylists(this.props.user.id)
			.then(response => {
				this.setState({ playlists: response.items });
			});
	}

	render() {
		const { playlists } = this.state;

		return (
			<React.Fragment>
				<h1>Playlists!</h1>
				<List className={styles.root}>
					{playlists.map(playlist => {
						let showDivider =
							playlists.indexOf(playlist) !== playlists.length - 1;

						let playlistUrl = `/spotify/playlists/${playlist.id}`;

						if (showDivider) {
							return (
								<ListItem
									key={playlist.id}
									divider
									component={Link}
									to={playlistUrl}
								>
									<ListItemText primary={playlist.name} />
								</ListItem>
							);
						} else {
							return (
								<ListItem
									key={playlist.id}
									component={Link}
									to={playlistUrl}
									id={playlist.id}
								>
									<ListItemText primary={playlist.name} />
								</ListItem>
							);
						}
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
	return {
		user,
		spotifyWebApi
	};
}

export default withRouter(connect(mapStateToProps, actions)(Playlists));
