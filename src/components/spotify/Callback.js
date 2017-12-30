import React, { Component } from 'react';
import { connect } from 'react-redux';
import querystring from 'query-string';
import * as SpotifyWebApi from 'spotify-web-api-js';
import * as actions from '../../actions';

class Callback extends Component {
  componentDidMount() {
    const { access_token } = querystring.parse(window.location.hash);

    debugger;

    if (!accessToken) {
      const { error } = querystring.parse(window.location.search);

      return this.props.loginError(error);
    }
    // todo: dispatch an action here passing the token to set in local storage.
    this.props.receiveLogin(access_token);
    // localStorage.setItem('spotifyAccessToken', access_token);

    // should this be moved to an action too?
    this.props.setApiKey();
    // var webApi = new SpotifyWebApi();
    // webApi.setAccessToken(access_token);

    this.props.fetchUser(this.props.spotifyWebApi);
  }

  render() {
    return <h1>Callback Page!</h1>;
  }
}

function mapStateToProps(state) {
  const { spotifyWebApi, user } = state;

  return { spotifyWebApi, user };
}

export default connect(mapStateToProps, actions)(Callback);
