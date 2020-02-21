import React, { Component } from "react";
// import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import GameRoom from "./GameRoom";
import { updateGameRoom } from "../../actions/gameRooms";
import { Link } from "react-router-dom";
import CreateGameRoomContainer from "./CreateGameRoom/CreateGameRoomContainer";

class GameRoomContainer extends Component {
  componentDidMount = () => {
    const isLoggedIn = this.props.user.token;
    if (!isLoggedIn) {
      this.props.history.push("/login");
    }
  };
  handleJoin = e => {
    console.log("Join is clicked", e.target.id);
    console.log("user token", this.props.user.token);
    const gameRoomInformation = {
      userToken: this.props.user.token,
      gameRoomId: e.target.id
    };
    this.props.updateGameRoom(gameRoomInformation, this.props.history);
  };
  renderGamerooms = (rooms, RoomComponent) => {  //Component made within this component!
    return rooms.map(room => {
      console.log("game room container", room);
      return (
        <RoomComponent              //Component made within this component!
          key={room.gameRoomId}
          id={room.gameRoomId}
          name={room.gameRoomName}
          handleClick={this.handleJoin}
        />
      );
    });
  };

  render() {
    if (!this.props.rooms.length) {
      return (
        <div>
          <CreateGameRoomContainer />
          <Link to="/" style={{ color: "pink" }}>
            <p>Back to Home</p>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <CreateGameRoomContainer />
        <div>{this.renderGamerooms(this.props.rooms, GameRoom)}</div>
        <Link to="/" style={{ color: "pink" }}>
          <p>Back to Home</p>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state of GR", state);
  return {
    rooms: state.gameRoom,
    user: state.user.user
  };
};
export default connect(mapStateToProps, { updateGameRoom })(GameRoomContainer);
