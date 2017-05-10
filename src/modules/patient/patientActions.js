export const SELECT_PATIENT = 'SELECT_PATIENT';
export function selectPatient(patientId) {
  return {
    type: SELECT_PATIENT,
    patientId,
  };
}
