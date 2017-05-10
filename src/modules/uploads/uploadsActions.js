export const SET_INSURANCE_UPLOAD_FRONT = 'SET_INSURANCE_UPLOAD_FRONT';
export function setInsuranceUploadFront(uri) {
  return {
    type: SET_INSURANCE_UPLOAD_FRONT,
    uri,
  };
}

export const SET_INSURANCE_UPLOAD_BACK = 'SET_INSURANCE_UPLOAD_BACK';
export function setInsuranceUploadBack(uri) {
  return {
    type: SET_INSURANCE_UPLOAD_BACK,
    uri,
  };
}
