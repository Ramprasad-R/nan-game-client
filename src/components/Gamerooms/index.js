import React, { Component } from "react";
// import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import GameRoom from "./GameRoom";

class GameRoomContainer extends Component {
  componentDidMount = () => {
    const isLoggedIn = this.props.user.token;
    if (!isLoggedIn) {
      this.props.history.push("/login");
    }
  };
  renderGamerooms = (rooms, RoomComponent) => {
    return rooms.map(room => (
      <RoomComponent key={room.gameRoomId} name={room.gameRoomName} />
    ));
  };

  render() {
    if (!this.props.rooms.length) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )   
    }  
    return <div>{this.renderGamerooms(this.props.rooms, GameRoom)}</div>;
  }
}

const mapStateToProps = state => {
  console.log("state of GR", state);
  return {
    rooms: state.gameRoom,
    user: state.user.user
  };
};
export default connect(mapStateToProps)(GameRoomContainer);
