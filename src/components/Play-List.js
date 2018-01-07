import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: '360px',
		backgroundColor: theme.palette.background.paper
	}
});

const PlayDashList = props => {
	// state = {};
	// render() {
	debugger;
	const { playlistItems } = props;

	return (
		<List className={styles.root}>
			{playlistItems.map(item => {
				return (
					<ListItem
						divider={playlistItems.indexOf(item) === playlistItems.length - 1}
					>
						<ListItemText primary={item.name} />
					</ListItem>
				);
			})}
		</List>
	);
	// }
};

export default PlayDashList;
