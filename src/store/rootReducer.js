import { combineReducers } from 'redux';
import { NavigationReducer } from '@expo/ex-navigation';
import { patientReducer } from 'modules/patient';
import { entitiesReducer } from 'modules/entities';
import { reportTypesReducer } from 'modules/report-types';
import { userReducer } from 'modules/user';


const rootReducer = combineReducers({
  entities: entitiesReducer,
  navigation: NavigationReducer,
  patient: patientReducer,
  reportTypes: reportTypesReducer,
  user: userReducer,
});

export default rootReducer;
