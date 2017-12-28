import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
// import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authentication: authReducer
  // routing: routerReducer
});

export default rootReducer;
