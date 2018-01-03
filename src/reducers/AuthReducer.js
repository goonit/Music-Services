import {
	CHANGE_AUTH,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	FETCH_USER,
	LOGOUT_USER,
	SET_API_KEY
} from '../actions/types';
import * as SpotifyWebApi from 'spotify-web-api-js';

export default function(state = {}, action) {
	switch (action.type) {
		case CHANGE_AUTH:
			return action.payload;

		case LOGIN_REQUEST:
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				isFetching: action.payload.isFetching
			};

		case LOGIN_FAILURE:
			return {
				...state,
				message: action.payload.message,
				isAuthenticated: action.payload.isAuthenticated,
				isFetching: action.payload.isFetching
			};

		case LOGIN_SUCCESS:
			console.log('login success action');
			debugger;
			return { ...state, isAuthenticated: true };

		case LOGOUT_USER:
			return { ...state, isAuthenticated: false };

		case FETCH_USER:
			return { ...state, user: action.payload };

		case SET_API_KEY:
			debugger;
			return { ...state, spotifyWebApi: action.payload };

		default:
			return state;
	}
}
