import React, { Component } from 'react';
import Button from 'material-ui/Button';
import axios from 'axios';
import querystring from 'query-string';
import * as actions from '../../actions';

class Spotify extends Component {
  state = {
    baseUri: '',
    queryStringParams: ''
  };

  generateRandomString = length => {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  dispatchRequestLogin = dispatch => {
    this.props.requestLogin();
  };

  componentDidMount() {
    // todo: move this into an action creator.
    const clientId = localStorage.getItem('spotifyClientId');
    // const clientSecret = localStorage.getItem('spotifyClientSecret');
    const redirectUri = localStorage.getItem('spotifyRedirectUri');
    const scope = localStorage.getItem('spotifyAuthScopes');

    let baseUri = 'https://accounts.spotify.com/authorize?';
    // let queryStringParams = `client_id=${clientId}
    // &response_type=code&
    // scope=${encodeURI(scope)}
    // &redirect_uri=${redirectUri}
    // &state=${this.generateRandomString(16)}`;

    this.setState({
      spotifyAuthUri:
        baseUri +
        querystring.stringify({
          response_type: 'token',
          client_id: clientId,
          scope,
          redirect_uri: redirectUri,
          state: this.generateRandomString(16)
        })
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recents</h1>
        <a
          href={this.state.spotifyAuthUri}
          style={{ textDecorationLine: 'none' }}
          onClick={this.dispatchRequestLogin}
        >
          <Button raised>Spotify Login</Button>
        </a>
      </React.Fragment>
    );
  }
}

export default Spotify;
