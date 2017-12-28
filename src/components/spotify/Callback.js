import React, { Component } from 'react';
import querystring from 'query-string';
import * as SpotifyWebApi from 'spotify-web-api-js';

class Callback extends Component {
  state = {
    authCode: ''
  };

  componentDidMount() {
    const { access_token } = querystring.parse(window.location.hash);

    debugger;
    localStorage.setItem('spotifyAccessToken', access_token);

    var webApi = new SpotifyWebApi();
    webApi.setAccessToken(access_token);

    webApi.getMe().then(response => {
      console.log(response);
    });
  }

  render() {
    return <h1>Callback Page!</h1>;
  }
}

export default Callback;
