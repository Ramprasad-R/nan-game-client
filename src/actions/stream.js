export const GAMEROOM_FETCHED = "GAMEROOM_FETCHED";
export const GAMEROOMS_FETCHED = "GAMEROOMS_FETCHED";

export const gameRoomsFetched = gameRooms => {
  return {
    type: GAMEROOMS_FETCHED,
    payload: gameRooms
  };
};

export const gameRoomFetched = gameRoom => {
  return {
    type: GAMEROOM_FETCHED,
    payload: gameRoom
  }
}