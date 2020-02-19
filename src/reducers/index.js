import { combineReducers } from "redux";
import user from "./user";
import gameRoom from "./gameRoom";
import scoreBoard from "./scoreBoard";
export default combineReducers({
  user,
  gameRoom,
  scoreBoard
});
