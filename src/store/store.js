import { createNavigationEnabledStore } from '@expo/ex-navigation';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line no-unused-vars
import rootReducer from './rootReducer';


const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const middlewares = [];
// Uncomment below line when debugging, if needed. Don't commit the uncommented version though.
//middlewares.push(logger);

const store = createStoreWithNavigation(rootReducer, applyMiddleware(...middlewares));

export default store;
