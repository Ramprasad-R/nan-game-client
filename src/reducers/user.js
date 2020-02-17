import { USER_CREATED } from "../actions/users";

const initialState = { userCreated: false };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_CREATED:
      return { ...state, userCreated: true };
    default:
      return state;
  }
};
