import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

// throttle makes sure that the method doesn't get called any more than x ms provided
store.subscribe(
	throttle(() => {
		// debugger;
		saveState({
			authentication: {
				spotifyAccessToken: store.getState().authentication.spotifyAccessToken,
				spotifyTokenExpiration: store.getState().authentication
					.spotifyTokenExpiration
			}
		});
	}),
	10000
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
