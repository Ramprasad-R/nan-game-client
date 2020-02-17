import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GameRoomContainer extends Component {
  state = {
    gamerooms: [{
      id: 1,
      name: "gameRoom1"
    },
    {
      id: 2,
      name: "gameRoom2"
    }
  ]}

  render() {
    return this.state.gamerooms 
    ? this.state.gamerooms.map((room, id) => (
      <ul key={id}>
        <li>{room.name}</li>
        <Link to={`/gamerooms/${room.id}`}><button>Join!</button></Link>
      </ul>
    ))
    : "Loading..."
  }
}
export default GameRoomContainer