import React from "react";
// import { Link } from "react-router-dom";

export default function GameCard(props) {
  console.log("props", props)
  return (
    <div>
      {props.name}
      <button>Join!</button>
    </div>
  );
}