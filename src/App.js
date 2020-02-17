import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <h1>NaN Game Header</h1>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
      </BrowserRouter>
      <h1>NaN Game Footer</h1>
    </div>
  );
}

export default App;
