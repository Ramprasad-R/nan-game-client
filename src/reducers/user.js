import { USER_CREATED, LOGIN_SUCCESS } from "../actions/users";

const initialState = { userCreated: false, token: null };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_CREATED:
      return { ...state, userCreated: true };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
};
