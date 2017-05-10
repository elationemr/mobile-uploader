import { createSelector } from 'reselect';


export const getSelectedPatient = createSelector(
  state => state.patient.selectedPatientId,
  state => state.entities.patients,
  (patientId, patients) => {
    return patients[patientId] || {};
  }
);
