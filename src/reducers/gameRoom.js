import { GAMEROOMS_FETCHED, GAMEROOM_FETCHED } from "../actions/stream";

export default (state = [], action) => {
  switch (action.type) {
    case GAMEROOMS_FETCHED:
      return [...state, action.payload];
    case GAMEROOM_FETCHED:
      return [...state, action.payload];
    default:
      return state;
  }
};
