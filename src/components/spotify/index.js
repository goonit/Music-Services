import React, { Component } from 'react';
import Button from 'material-ui/Button';
import axios from 'axios';
import querystring from 'query-string';

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

  handleClick = () => {
    axios
      .get(this.state.spotifyAuthUri, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept'
        }
      })
      .then(response => console.log(response));
  };

  componentDidMount() {
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
        >
          <Button raised>Spotify Login</Button>
        </a>
        {/* <Button raised component={Redirect} to={this.state.spotifyAuthUri}>
          Login with Spotify
        </Button> */}
      </React.Fragment>
    );
  }
}

export default Spotify;
