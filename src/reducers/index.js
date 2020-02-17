import { combineReducers } from "redux";
import user from './user'
import gameRoom from './gameRoom'

export default combineReducers({
  user, gameRoom
});
