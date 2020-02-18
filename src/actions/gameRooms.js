import request from "axios";
const baseUrl = "http://localhost:4000";

// export const GAMEROOMS_FETCHED = 'GAMEROOMS_FETCHED'
// export const GAMEROOM_FETCHED = 'GAMEROOM_FETCHED'
export const GAMEROOM_CREATE_SUCCESS = 'GAMEROOM_CREATE_SUCCESS'
// export const GAMEROOM_DELETE_SUCCESS = 'GAMEROOM_DELETE_SUCCESS'
// export const GAMEROOM_UPDATE_SUCCESS = 'GAMEROOM_UPDATE_SUCCESS'

// // const url = process.env.DATABASE_URL || 'https://damp-beach-23036.herokuapp.com';
// // const baseUrl = url

// const gameRoomsFetched = gameRooms => ({
//   type: GAMEROOMS_FETCHED,
//   gameRooms
// })

// const gameRoomFetched = gameRoom => ({
//   type: GAMEROOM_FETCHED,
//   gameRoom
// })

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

// export const loadGameRooms = () => (dispatch, getState) => {
//   // when the state already contains gameRooms, we don't fetch them again
//   if (getState().gameRooms.length > 0) return

//   // a GET /gameRooms request
//   request(`${baseUrl}/gamerooms`)
//     .then(response => {
//       // dispatch an GAMEROOMS_FETCHED action that contains the gameRooms
//       dispatch(gameRoomsFetched(response.body))
//     })
//     .catch(console.error)
// }

// export const loadGameRoom = (id) => (dispatch) => {
//   request(`${baseUrl}/gamerooms/${id}`)
//     .then(response => {
//       dispatch(gameRoomFetched(response.body))
//     })
//     .catch(console.error)
// }

export const createGameRoom = (gameRoomInformation) => async dispatch => {
  console.log(`dispatched createGameRoom`, gameRoomInformation)
  try {
    const response = await request({
      method: "POST",
      url: `${baseUrl}/stream`,
      headers: { authorization: `Bearer ${gameRoomInformation["userToken"]}` },
      data: gameRoomInformation
    });
    console.log("Success in create room", response);
  } catch (error) {
    console.log("Error response to create room", error);
  }
};

// export const updateGameRoom = (id, data) => dispatch => {
//   request
//     .put(`${baseUrl}/gamerooms/${id}`)
//     .send(data)
//     .then(response => {
//       dispatch(gameRoomUpdateSuccess(response.body))
//     })
//     .catch(console.error)
// }

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
  } catch (error) {
    console.log("Error response to join game room", error);
  }
};
