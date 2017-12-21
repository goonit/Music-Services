import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(
	<Provider store={createStore(rootReducer)}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
