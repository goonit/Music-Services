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

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(rootReducer)}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
