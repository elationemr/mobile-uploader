import { createSelector } from 'reselect';


export const getPatientSearchResults = createSelector(
  state => state.entities.patients,
  (patientsById) => (
    Object.keys(patientsById).map(id => patientsById[id])
  )
);
