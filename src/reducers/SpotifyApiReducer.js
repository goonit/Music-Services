import { GET_PLAYLIST_TRACKS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_PLAYLIST_TRACKS:
			console.log(GET_PLAYLIST_TRACKS);
			return {
				...state,
				playlistTracks: action.payload
			};
		default:
			return state;
	}
}
