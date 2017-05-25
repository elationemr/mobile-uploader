import { combineReducers } from 'redux';
import { NavigationReducer } from '@expo/ex-navigation';
import { patientReducer } from 'modules/patient';
import { entitiesReducer } from 'modules/entities';
import { reportTypesReducer } from 'modules/report-types';


const rootReducer = combineReducers({
  entities: entitiesReducer,
  navigation: NavigationReducer,
  patient: patientReducer,
  reportTypes: reportTypesReducer,
});

export default rootReducer;
