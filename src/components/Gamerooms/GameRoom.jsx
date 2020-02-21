import React from "react";
// import { Link } from "react-router-dom";
export default function GameRoom(props) {
  console.log("props", props);

  return (
    <div>
      {props.name}
      <button id={props.id} onClick={props.handleClick}>
        Join!
      </button>
    </div>
  );
}
