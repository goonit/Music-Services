import {
	CHANGE_AUTH,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	FETCH_USER,
	LOGOUT_USER,
	SET_API_KEY
} from './types';
import * as SpotifyWebApi from 'spotify-web-api-js';
import {} from 'react-router-dom';

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

// export function postAuthRedirect() {
// 	return function(dispatch) {
// 		dispatch({ type: POST_AUTH_REDIRECT, payload: })

// 	}
// }

export function setApiAndKey() {
	return function(dispatch) {
		let webApi = new SpotifyWebApi();
		webApi.setAccessToken(localStorage.getItem('spotifyAccessToken'));
		dispatch({ type: SET_API_KEY, payload: webApi });
	};
}

export function receiveLogin(authToken) {
	return function(dispatch) {
		dispatch({ type: LOGIN_SUCCESS });
		localStorage.setItem('spotifyAccessToken', authToken);
	};
	// return {
	//   type: LOGIN_SUCCESS,
	//   isFetching: true,
	//   isAuthenticated: true,
	//   id_token: user.id_token
	// };
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

export function fetchUser(spotifyWebApi) {
	// debugger;
	return function(dispatch) {
		// debugger;
		spotifyWebApi.getMe().then(response => {
			dispatch({ type: FETCH_USER, payload: response });
			console.log(response);
		});
	};
}

export function userLogout() {
	localStorage.removeItem('spotifyAccessToken');

	return { type: LOGOUT_USER };
}
