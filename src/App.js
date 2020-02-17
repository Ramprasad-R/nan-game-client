import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
// import axios from 'axios'
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GameRoomContainer from "./components/Gamerooms";
import { connect } from "react-redux";
// const baseUrl = process.env.PORT || 4000
import { gameRoomsFetched } from "./actions/stream";
class App extends React.Component {
  // state = {
  //   gamerooms: [],
  //   gameroom: "first"
  // };
  stream = new EventSource("http://localhost:4000/stream");
  // stream = new EventSource(`${baseUrl}/stream`)

  componentDidMount = () => {
    this.stream.onmessage = event => {
      const { data } = event;

      const action = JSON.parse(data);
      console.log("action test:", action);

      const { type, payload } = action;

      if (type === "ALL_GAMEROOMS") {
        //  this.setState({ gamerooms: payload });
        payload.map(room => this.props.gameRoomsFetched(room.name));
      }

      if (type === "ONE_GAMEROOM") {
        // const gamerooms = [...this.state.gamerooms, payload];
        // this.setState({ gamerooms });
      }
    };
  };

  render() {
    return (
      <div className="App">
        <h1>NaN Game Header</h1>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </BrowserRouter>
        <h1>NaN Game Footer</h1>
      </div>
    );
  }
}

export default connect(null, { gameRoomsFetched })(App);
