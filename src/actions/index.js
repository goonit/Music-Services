import {
	CHANGE_AUTH,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	FETCH_USER,
	LOGOUT_USER,
	SPOTIFY_SET_API,
	GET_PLAYLIST_TRACKS
} from './types';
import moment from 'moment';
import * as SpotifyWebApi from 'spotify-web-api-js';

export function authenticate(isLoggedIn) {
	return {
		type: CHANGE_AUTH,
		payload: isLoggedIn
	};
}

export function requestLogin() {
	console.log('requestLogin called');
	return {
		type: LOGIN_REQUEST,
		payload: {
			isFetching: true,
			isAuthenticated: false
		}
	};
}

export function getPlaylistTracks(spotifyWebApi, userId, playlistId) {
	return function(dispatch) {
		spotifyWebApi.getPlaylistTracks(userId, playlistId).then(response => {
			dispatch({ type: GET_PLAYLIST_TRACKS, payload: response });
		});
	};
}

export function receiveLogin(authToken, authExpiration) {
	return function(dispatch) {
		dispatch({ type: LOGIN_SUCCESS, payload: { authToken, authExpiration } });
	};
}

export function loginError(message) {
	return {
		type: LOGIN_FAILURE,
		payload: {
			isFetching: false,
			isAutheticated: false,
			message
		}
	};
}

export function setSpotifyApi(accessToken) {
	return function(dispatch) {
		let webApi = new SpotifyWebApi();
		webApi.setAccessToken(accessToken);
		dispatch({ type: SPOTIFY_SET_API, payload: webApi });
	};
}

export function fetchUser(spotifyWebApi) {
	return function(dispatch) {
		spotifyWebApi.getMe().then(response => {
			dispatch({ type: FETCH_USER, payload: response });
			console.log(`user: ${JSON.stringify(response)}`);
		});
	};
}

export function userLogout() {
	return function(dispatch) {
		localStorage.removeItem('spotifyAccessToken');
		dispatch({ type: LOGOUT_USER });
	};
}
