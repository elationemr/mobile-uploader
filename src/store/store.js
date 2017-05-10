import { createNavigationEnabledStore } from '@expo/ex-navigation';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';


const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(rootReducer, applyMiddleware(logger));

export default store;
