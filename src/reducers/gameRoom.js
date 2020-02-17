import { GAMEROOMS_FETCHED} from '../actions/gameRooms.js'

export default (state = [], action) => {    
    switch (action.type) {
        case GAMEROOMS_FETCHED:
            return [...state, action.payload]
        default:
            return state
    }
}