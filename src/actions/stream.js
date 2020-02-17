import axios from "axios";

export const GAMEROOMS_FETCHED = "GAMEROOMS_FETCHED";

function gameRoomsFetched(gameRooms) {
  return {
    type: GAMEROOMS_FETCHED,
    payload: gameRooms
    } 
  };

