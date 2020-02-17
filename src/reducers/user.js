import { USER_CREATED, LOGIN_SUCCESS } from "../actions/users";

const initialState = { userCreated: false, user: { email: null, token: null } };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_CREATED:
      return { ...state, userCreated: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
