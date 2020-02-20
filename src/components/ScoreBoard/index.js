import React from "react";
import { useSelector } from "react-redux";
import sortBy from "lodash.sortby";

function ScoreBoard(props) {
  const state = useSelector(state => state.scoreBoard); //Similar to Map state to props using react hooks !!!
  const currentGameRoomScore = state.filter(
    score => parseInt(score.gameroomId) === parseInt(props.gameroomId)
  );
  const topFiveScore = sortBy(currentGameRoomScore, "score")
    .reverse()
    .slice(0, 5);
  return (
    <div>
      <h3>Gameroom Hall Of Fame</h3>
      {topFiveScore.map((score, index) => (
        <p key={index}>
          {score.user}
          <span> </span>
          {score.score}
        </p>
      ))}
    </div>
  );
}

export default ScoreBoard;