import {
  ALLSCORE_FETCHED,
  ONESCORE_FETCHED
} from "../actions/scoreBoardStream";

export default (state = [], action) => {
  switch (action.type) {
    case ALLSCORE_FETCHED:
      return [...state, action.payload];
    case ONESCORE_FETCHED:
      return [...state, action.payload];
    default:
      return state;
  }
};
