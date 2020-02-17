export const GAMEROOMS_FETCHED = "GAMEROOMS_FETCHED";

export const gameRoomsFetched = gameRooms => {
  return {
    type: GAMEROOMS_FETCHED,
    payload: gameRooms
  };
};
