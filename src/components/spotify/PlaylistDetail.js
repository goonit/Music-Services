import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { getPlaylistTracks } from '../../actions';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import IconButton from 'material-ui/IconButton';
import PlayIcon from 'material-ui-icons/PlayArrow';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ReactAudioPlayer from 'react-audio-player';

class PlaylistDetail extends Component {
	constructor(props) {
		super(props);

		this.handlePlayClick = this.handlePlayClick.bind(this);
	}
	state = {
		playlistTracks: []
	};

	componentDidMount() {
		const { userId, spotifyWebApi } = this.props;

		spotifyWebApi
			.getPlaylistTracks(userId, this.props.match.params.id)
			.then(response => {
				console.log(JSON.stringify(response.items));
				this.setState({ playlistTracks: response.items });
				// dispatch({ type: GET_PLAYLIST_TRACKS, payload: response });
			});

		// this.props.retrievePlaylistTracks(
		// 	spotifyWebApi,
		// 	userId,
		// 	this.props.match.params.id
		// );
	}

	handlePlayClick(track, event) {
		this.setState({ currentTrack: track.preview_url });
	}

	render() {
		const { id } = this.props.match.params;
		const { playlistTracks } = this.state;

		// debugger;

		return (
			<React.Fragment>
				<Paper elevation={4}>
					<Typography type="display3" gutterBottom>
						Playlist Details:
					</Typography>
					<Typography type="subheading" gutterBottom>
						Playlist ID: {id}
					</Typography>
					<ReactAudioPlayer src={this.state.currentTrack} autoPlay />
					<List className={styles.root}>
						{playlistTracks.map(item => {
							let showDivider =
								playlistTracks.indexOf(item) !== playlistTracks.length - 1;

							if (showDivider) {
								return (
									<ListItem key={item.track.id} divider dense>
										<IconButton
											onClick={e => this.handlePlayClick(item.track, e)}
										>
											<PlayIcon />
										</IconButton>
										<ListItemText primary={item.track.name} />
									</ListItem>
								);
							} else {
								return (
									<ListItem key={item.track.id} id={item.track.id} dense>
										<IconButton
											onClick={e => this.handlePlayClick(item.track, e)}
										>
											<PlayIcon />
										</IconButton>
										<ListItemText primary={item.track.name} />
									</ListItem>
								);
							}
						})}
					</List>
				</Paper>
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
	const { playlistTracks } = state.spotifyApi;

	return {
		userId: user.id,
		spotifyWebApi,
		playlistTracks
	};
}

export default connect(mapStateToProps, { getPlaylistTracks })(PlaylistDetail);
