import { SELECT_PATIENT } from './patientActions';


const initialState = {
  selectedPatientId: null,
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PATIENT:
      return {
        ...state,
        selectedPatientId: action.patientId,
      };
    default:
      return state;
  }
}
