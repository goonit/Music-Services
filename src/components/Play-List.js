import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: '360px',
		backgroundColor: theme.palette.background.paper
	}
});

const PlayDashList = props => {
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
