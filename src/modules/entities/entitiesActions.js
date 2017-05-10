export const SET_PATIENT_PHOTO = 'SET_PATIENT_PHOTO';
export function setPatientPhoto(patientId, uri) {
  return {
    type: SET_PATIENT_PHOTO,
    patientId,
    uri,
  };
}

export const REMOVE_PATIENT_PHOTO = 'REMOTE_PATIENT_PHOTO';
export function removePatientPhoto(patientId) {
  return {
    type: REMOVE_PATIENT_PHOTO,
    patientId,
  };
}
