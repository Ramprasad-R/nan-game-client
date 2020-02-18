import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class GameRoomContainer extends Component {
  
  
  render() {
      return this.props.rooms
      ? this.props.rooms.map((room, id) => (
        <ul key={id}>
          <li>{room.name}</li>
          <button>Join!</button>
        </ul>
      ))
      : "Loading..."
}
}

const mapStateToProps = state => {
  console.log("state of GR", state.user.user)
  return {
    rooms: state.gameRoom,
    user: state.user.user
  }
}
export default connect(mapStateToProps)(GameRoomContainer)