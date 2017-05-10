import { SET_INSURANCE_UPLOAD_FRONT, SET_INSURANCE_UPLOAD_BACK } from './uploadsActions';


const initialState = {
  insuranceFrontUri: null,
  insuranceBackUri: null,
};

export default function uploadsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INSURANCE_UPLOAD_FRONT:
      return {
        ...state,
        insuranceFrontUri: action.uri,
      };
    case SET_INSURANCE_UPLOAD_BACK:
      return {
        ...state,
        insuranceBackUri: action.uri,
      };
    default:
      return state;
  }
}
