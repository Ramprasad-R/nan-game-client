import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
// import axios from 'axios'
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Gamerooms from "./components/Gamerooms/GameRoomContainer";
import { connect } from "react-redux";
// const baseUrl = process.env.PORT || 4000
import { gameRoomsFetched, gameRoomFetched } from "./actions/stream";
import { allScoreFetched, oneScoreFetched } from "./actions/scoreBoardStream";
import GameBoard from "./components/Gamerooms/Game/GameBoardContainer";

class App extends React.Component {
  // state = {
  //   gamerooms: [],
  //   gameroom: "first"
  // };
  stream = new EventSource("http://localhost:4000/stream");
  // stream = new EventSource(`${baseUrl}/stream`)
  scoreBoardStream = new EventSource("http://localhost:4000/scoreboard");
  componentDidMount = () => {
    this.stream.onmessage = event => {
      const { data } = event;

      const action = JSON.parse(data);
      // console.log("action test:", action);

      const { type, payload } = action;

      if (type === "ALL_GAMEROOMS") {
        //  this.setState({ gamerooms: payload });
        payload.map(room =>
          this.props.gameRoomsFetched({
            gameRoomName: room.name,
            gameRoomId: room.id
          })
        );
      }

      if (type === "ONE_GAMEROOM") {
        // const gamerooms = [...this.state.gamerooms, payload];
        // this.setState({ gamerooms });
        console.log("ONE_GAMEROOM", payload);

        this.props.gameRoomFetched({
          gameRoomName: payload.name,
          gameRoomId: payload.id
        });
      }
    };
    this.scoreBoardStream.onmessage = event => {
      const { data } = event;
      const action = JSON.parse(data);
      const { type, payload } = action;
      if (type === "ALL_SCOREINFO") {
        payload.map(score =>
          this.props.allScoreFetched({
            user: score.user.email,
            score: score.score,
            gameroomId: score.gameroomId
          })
        );
      }

      if (type === "ONE_SCORE") {
        this.props.oneScoreFetched({
          user: payload.user.email,
          score: payload.score,
          gameroomId: payload.gameroomId
        });
      }
    };
  };

  protectedRoute = (Component, routerProps) => {
    console.log("I cam here ", this.props.token);

    const token = this.props.token;
    return token ? <Component {...routerProps} /> : <Redirect to="/login" />;
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ color: "lightblue" }}>
          <span role="img" aria-label="">
            ⏱️
          </span>
          NaN
          <span role="img" aria-label="">
            ⏱️
          </span>
        </h1>
        <BrowserRouter>
          {/* <Switch> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/gamerooms"
            render={props => this.protectedRoute(Gamerooms, props)}
          />
          <Route
            exact
            path="/gamerooms/:id"
            render={props => this.protectedRoute(GameBoard, props)}
          />
          {/* </Switch> */}
        </BrowserRouter>
        <h1>
          <span role="img" aria-label="">
            🌀
          </span>
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.user.token
  };
};

export default connect(mapStateToProps, {
  gameRoomsFetched,
  gameRoomFetched,
  allScoreFetched,
  oneScoreFetched
})(App);
