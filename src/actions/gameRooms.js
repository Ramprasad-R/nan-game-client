import request from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const GAMEROOM_CREATE_SUCCESS = "GAMEROOM_CREATE_SUCCESS";
// export const GAMEROOM_DELETE_SUCCESS = 'GAMEROOM_DELETE_SUCCESS'
// export const GAMEROOM_UPDATE_SUCCESS = 'GAMEROOM_UPDATE_SUCCESS'

// // const url = process.env.DATABASE_URL || 'https://damp-beach-23036.herokuapp.com';
// // const baseUrl = url

// const gameRoomCreateSuccess = gameRoom => ({
//   type: GAMEROOM_CREATE_SUCCESS,
//   gameRoom
// })

// const gameRoomDeleteSuccess = gameRoom => ({
//   type: GAMEROOM_DELETE_SUCCESS,
//   gameRoom
// })

// const gameRoomUpdateSuccess = gameRoom => ({
//   type: GAMEROOM_UPDATE_SUCCESS,
//   gameRoom
// })

// export const deleteGameRoom = (gameRoom) => (dispatch) => {
//   request
//     .delete(`${baseUrl}/gamerooms/${gameRoom.id}`)
//     .then(response => {
//       if(response.ok){
//         // passing the original gameRoom object because the api
//         // returns {} instead of the deleted record
//         dispatch(gameRoomDeleteSuccess(gameRoom))
//       }
//     })
// }

export const createGameRoom = gameRoomInformation => async dispatch => {
  console.log(`dispatched createGameRoom`, gameRoomInformation);
  try {
    const response = await request({
      method: "POST",
      url: `${baseUrl}/stream`,
      // headers: { authorization: `Bearer ${gameRoomInformation["userToken"]}` },
      data: gameRoomInformation
    });
    console.log("Success in create room", response);
  } catch (error) {
    console.log("Error response to create room", error);
  }
};

// export const updateGameRoom = (gameRoomInformation, history) => dispath => {
//   console.log("Dispatched updateGameRoom", gameRoomInformation);

//   request
//     .post(`${baseUrl}/join`)
//     .set("Authorization", `Bearer ${gameRoomInformation["userToken"]}`)
//     .send(gameRoomInformation)
//     .then(response => {
//       console.log(
//         "Change the component to game panel once we have component ready"
//       );
//       history.push("/gamerooms"); // Change the component to game panel once we have component ready
//     })
//     .catch(console.error);
// };

export const updateGameRoom = (
  gameRoomInformation,
  history
) => async dispatch => {
  console.log("Dispatched updateGameRoom", gameRoomInformation);
  try {
    const response = await request({
      method: "POST",
      url: `${baseUrl}/join`,
      headers: { authorization: `Bearer ${gameRoomInformation["userToken"]}` },
      data: gameRoomInformation
    });
    console.log("Success in Join", response);
    console.log(
      `gameRoomId needed for sending user to the correct room: `,
      gameRoomInformation.gameRoomId
    );
    history.push(`/gamerooms/${gameRoomInformation.gameRoomId}`);
  } catch (error) {
    console.log("Error response to join game room", error);
  }
};

export const gameRoomPlayerScore = gameRoomData => async dispatch => {
  console.log("Dispatch gameRoomInfo", gameRoomData);
  try {
    const response = await request({
      method: "POST",
      url: `${baseUrl}/scoreboard`,
      // headers: { authorization: `Bearer ${gameRoomInfo["userToken"]}` },
      data: gameRoomData
    });
    console.log("Success in passing winning info", response);
    console.log(`gameroomId: `, gameRoomData);
  } catch (error) {
    console.log("Error response for passing winning info", error);
  }
};
