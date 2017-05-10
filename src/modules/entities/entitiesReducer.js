import { SET_PATIENT_PHOTO, REMOVE_PATIENT_PHOTO } from './entitiesActions';


const initialState = {
  patients: {
    123: {
      id: 123,
      firstName: 'Stephen',
      lastName: 'Curry',
      sex: 'M',
      dob: '03/14/88',
      age: 29,
      photoUri: null,
    },
    456: {
      id: 456,
      firstName: 'Kevin',
      lastName: 'Durant',
      sex: 'M',
      dob: '09/29/88',
      age: 28,
      photoUri: null,
    },
    789: {
      id: 789,
      firstName: 'Porter',
      lastName: 'Robinson',
      sex: 'M',
      dob: '07/15/92',
      age: 24,
      photoUri: null,
    },
    38059: {
      id: 38059,
      firstName: 'Sonya',
      lastName: 'Curry',
      sex: 'F',
      dob: '05/30/66',
      age: 50,
      photoUri: null,
    },
    8385: {
      id: 8385,
      firstName: 'Steve',
      lastName: 'Kerr',
      sex: 'M',
      dob: '09/27/65',
      age: 51,
      photoUri: null,
    },
    90281: {
      id: 90281,
      firstName: 'Utada',
      lastName: 'Hikaru',
      sex: 'F',
      dob: '01/19/83',
      age: 34,
      photoUri: null,
    },
    2891: {
      id: 2891,
      firstName: 'Mary',
      lastName: 'Jane',
      sex: 'F',
      dob: '04/20/00',
      age: 17,
      photoUri: null,
    },
  },
};

export default function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT_PHOTO:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: {
            ...state.patients[action.patientId],
            photoUri: action.uri,
          },
        },
      };
    case REMOVE_PATIENT_PHOTO:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: {
            ...state.patients[action.patientId],
            photoUri: null,
          },
        },
      };
    default:
      return state;
  }
}
