import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation, {
	BottomNavigationAction
} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import RecentsIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import HomeIcon from 'material-ui-icons/Home';

const bottomNavStyle = {
	flex: 1,
	justifyContent: 'center',
	position: 'fixed',
	bottom: 0,
	display: 'flex',
	width: '100%',
	height: '56px'
};

class BottomNav extends Component {
	state = {
		value: 'home'
	};

	select = (event, value) => {
		this.setState({ value });
	};

	render() {
		const propsVal = this.props.value;

		return (
			<React.Fragment>
				<Paper elevation={1} style={bottomNavStyle}>
					<BottomNavigation value={propsVal}>
						<BottomNavigationAction
							label="Home"
							icon={<HomeIcon />}
							component={Link}
							value="home"
							to="/spotify"
						/>
						<BottomNavigationAction
							label="Recents"
							icon={<RecentsIcon />}
							component={Link}
							value="recents"
							to="/spotify/recents"
						/>
						<BottomNavigationAction
							label="Favorites"
							icon={<FavoriteIcon />}
							component={Link}
							value="favorites"
							to="/spotify/favorites"
						/>
						<BottomNavigationAction
							label="Playists"
							icon={<Icon>playlist_play</Icon>}
							component={Link}
							value="playlists"
							to="/spotify/playlists"
						/>
					</BottomNavigation>
				</Paper>
			</React.Fragment>
		);
	}
}

export default BottomNav;
