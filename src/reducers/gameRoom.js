import { GAMEROOMS_FETCHED, GAMEROOM_CREATE_SUCCESS, GAMEROOM_DELETE_SUCCESS, GAMEROOM_UPDATE_SUCCESS } from '../actions/gameRooms.js'

export default (state = [], action) => {    
    switch (action.type) {
        case GAMEROOMS_FETCHED:
            return action.gameRooms
        case GAMEROOM_CREATE_SUCCESS:
            return [...state, action.gameRoom]
        case GAMEROOM_DELETE_SUCCESS:
            return state.filter(gameRoom => gameRoom.id !== action.gameRoom.id)
        case GAMEROOM_UPDATE_SUCCESS:
            return state.map(gameRoom => {
                if(gameRoom.id === action.gameRoom.id){
                    return action.gameRoom
                }
                return gameRoom
            })
    
        default:
            return state
    }
}