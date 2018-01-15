import {
	CHANGE_AUTH,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	FETCH_USER,
	LOGOUT_USER,
	SPOTIFY_SET_API
} from '../actions/types';

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
			return {
				...state,
				isAuthenticated: true,
				spotifyAccessToken: action.payload.authToken,
				spotifyTokenExpiration: action.payload.authExpiration
			};

		case LOGOUT_USER:
			return { ...state, isAuthenticated: false };

		case FETCH_USER:
			return { ...state, user: action.payload };

		case SPOTIFY_SET_API:
			return { ...state, spotifyWebApi: action.payload };

		default:
			return state;
	}
}
