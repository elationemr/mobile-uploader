import { combineReducers } from 'redux';
import { NavigationReducer } from '@expo/ex-navigation';
import { patientReducer } from 'modules/patient';
import { entitiesReducer } from 'modules/entities';


const rootReducer = combineReducers({
  entities: entitiesReducer,
  navigation: NavigationReducer,
  patient: patientReducer,
});

export default rootReducer;
