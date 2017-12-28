import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation, {
  BottomNavigationButton
} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import RecentsIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
// import Playlists from '../components/spotify/Playlists';

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
    selectedIndex: 0
  };

  select = (event, value) => this.setState({ selectedIndex: value });

  render() {
    return (
      <React.Fragment>
        <Paper elevation={1} style={bottomNavStyle}>
          <BottomNavigation
            value={this.state.selectedIndex}
            showLabels
            onChange={this.select}
          >
            <BottomNavigationButton
              label="Recents"
              icon={<RecentsIcon />}
              component={Link}
              to="/spotify/recents"
            />
            <BottomNavigationButton
              label="Favorites"
              icon={<FavoriteIcon />}
              component={Link}
              to="/spotify/favorites"
            />
            <BottomNavigationButton
              label="Playists"
              icon={<Icon>playlist_play</Icon>}
              component={Link}
              to="/spotify/playlists"
            />
          </BottomNavigation>
        </Paper>
      </React.Fragment>
    );
  }
}

export default BottomNav;
