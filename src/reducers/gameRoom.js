import { GAMEROOMS_FETCHED, GAMEROOM_FETCHED } from "../actions/stream";
import { GAMEROOM_CREATE_SUCCESS } from "../actions/gameRooms";

export default (state = [], action) => {
  switch (action.type) {
    case GAMEROOM_CREATE_SUCCESS:
      return [...state, action.payload]
    case GAMEROOMS_FETCHED:
      return [...state, action.payload];
    case GAMEROOM_FETCHED:
      return [...state, action.payload];
    default:
      return state;
  }
};
