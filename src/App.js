import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
// import axios from 'axios'
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

// const baseUrl = process.env.PORT || 4000


class App extends React.Component {
  state = {
    gamerooms: [],
    gameroom: 'first'
  }
   stream = new EventSource('http://localhost:4000/stream')
  // stream = new EventSource(`${baseUrl}/stream`)

  componentDidMount = () => {
    this.stream.onuser = event => {
      const { data } = event

      const action = JSON.parse(data)
      console.log('action test:', action)

      const { type, payload } = action

      if (type === 'ALL_GAMEROOMS') {
        this.setState({ gamerooms: payload })
      }

      if (type === 'ONE_GAMEROOM') {
        const gamerooms = [
          ...this.state.gamerooms,
          payload
        ]

        this.setState({ gamerooms })
      }
    }
  }
   pick = (name, id) => {
    this.setState({
      gameroom: name,
      gameroomId: id
    })
  }
  render(){
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

export default App;