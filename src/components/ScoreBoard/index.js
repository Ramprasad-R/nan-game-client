import React from "react";
import { useSelector } from "react-redux";
import sortBy from "lodash.sortby";
function ScoreBoard(props) {
  const state = useSelector(state => state.scoreBoard);
  console.log("In scoreboard container", state);
  console.log("In scoreboard container gameroom id", props.gameroomId);
  const currentGameRoomScore = state.filter(
    score => parseInt(score.gameroomId) === parseInt(props.gameroomId)
  );
  const topFiveScore = sortBy(currentGameRoomScore, "score")
    .reverse()
    .slice(0, 5);
  console.log("Current Game Room Score", topFiveScore);

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
