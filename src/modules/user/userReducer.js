import { LOGIN } from './userActions';


const initialState = {
  isAuthenticated: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
