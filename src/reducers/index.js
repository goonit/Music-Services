import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import spotifyApiReducer from './SpotifyApiReducer';

const rootReducer = combineReducers({
	spotifyApi: spotifyApiReducer,
	authentication: authReducer
});

export default rootReducer;
