import request from 'axios'

export const GAMEROOMS_FETCHED = 'GAMEROOMS_FETCHED'
export const GAMEROOM_FETCHED = 'GAMEROOM_FETCHED'
export const GAMEROOM_CREATE_SUCCESS = 'GAMEROOM_CREATE_SUCCESS'
export const GAMEROOM_DELETE_SUCCESS = 'GAMEROOM_DELETE_SUCCESS'
export const GAMEROOM_UPDATE_SUCCESS = 'GAMEROOM_UPDATE_SUCCESS'

// const url = process.env.DATABASE_URL || 'https://damp-beach-23036.herokuapp.com';
const baseUrl = 'http://localhost:4000'
// const baseUrl = url

const gameRoomsFetched = gameRooms => ({
  type: GAMEROOMS_FETCHED,
  gameRooms
})

const gameRoomFetched = gameRoom => ({
  type: GAMEROOM_FETCHED,
  gameRoom
})

const gameRoomCreateSuccess = gameRoom => ({
  type: GAMEROOM_CREATE_SUCCESS,
  gameRoom
})

const gameRoomDeleteSuccess = gameRoom => ({
  type: GAMEROOM_DELETE_SUCCESS,
  gameRoom
})

const gameRoomUpdateSuccess = gameRoom => ({
  type: GAMEROOM_UPDATE_SUCCESS,
  gameRoom
})



export const deleteGameRoom = (gameRoom) => (dispatch) => {
  request
    .delete(`${baseUrl}/gamerooms/${gameRoom.id}`)
    .then(response => {
      if(response.ok){
        // passing the original gameRoom object because the api 
        // returns {} instead of the deleted record
        dispatch(gameRoomDeleteSuccess(gameRoom))
      }
    })
}

export const loadGameRooms = () => (dispatch, getState) => {
  // when the state already contains gameRooms, we don't fetch them again
  if (getState().gameRooms.length > 0) return

  // a GET /gameRooms request
  request(`${baseUrl}/gamerooms`)
    .then(response => {
      // dispatch an GAMEROOMS_FETCHED action that contains the gameRooms
      dispatch(gameRoomsFetched(response.body))
    })
    .catch(console.error)
}

export const loadGameRoom = (id) => (dispatch) => {
  request(`${baseUrl}/gamerooms/${id}`)
    .then(response => {
      dispatch(gameRoomFetched(response.body))
    })
    .catch(console.error)
}



export const createGameRoom = (data) => dispatch => {
  request
    .post(`${baseUrl}/gamerooms`)
    .send(data)
    .then(response => {
      dispatch(gameRoomCreateSuccess(response.body))
    })
    .catch(console.error)
}

export const updateGameRoom = (id, data) => dispatch => {
  request
    .put(`${baseUrl}/gamerooms/${id}`)
    .send(data)
    .then(response => {
      dispatch(gameRoomUpdateSuccess(response.body))
    })
    .catch(console.error)
}