import React, { Component } from "react";
import shuffle from "lodash.shuffle";
import Card from "./Card/Card";
// import GuessCount from "./GuessCount/GuessCount";
import { connect } from "react-redux";
import { gameRoomPlayerScore } from "../../../actions/gameRooms";
import { Link } from "react-router-dom";
import "./GameBoardContainer.css";
import ScoreBoard from "../../ScoreBoard";
import Timer from "./Timer/Timer";
// import { updateGameRoom } from "../../../actions/gameRooms";

// import HallOfFame, { FAKE_HOF } from './components/halloffame/HallOfFame'

const SIDE = 2;
const SYMBOLS = "🎃🎂🎅🐰🎥🍂👨💪🎓👩🎊🏊👑☪🌱☘☀🏈💘⚽";
const VISUAL_PAUSE_MSECS = 750;

class GameBoard extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: [],
    score: 30,
    isActive: false,
    gameStarted: false,
    timer: 0
  };
  timerBoardCompleted = false;
  guessesCount = 0;
  currentGameRoomId = this.props.location.pathname.split("/").pop();

  interval = null;
  shouldComponentUpdate = (nextProps, nextState) => {
    console.log(
      "checking timer",
      nextState.gameStarted,
      this.state.gameStarted
    );
    if (this.state.score <= 0) {
      clearInterval(this.interval);
      this.timerBoardCompleted = true;
      //window.location.reload();
    }
    if (!nextState.gameStarted) {
      console.log("GAME FINISSHED!!");
      clearInterval(this.interval);
    }
    if (!this.state.gameStarted) {
      this.interval = setInterval(
        () =>
          this.setState({
            timer: this.state.timer + 1,
            score:
              this.state.score - this.state.timer - this.guessesCount <= 0
                ? 0
                : this.state.score - this.state.timer - this.guessesCount
          }),
        1000
      );
    }

    return nextState.gameStarted;
  };

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state;
    const indexMatched = matchedCardIndices.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? "visible" : "hidden";
    }

    if (currentPair.includes(index)) {
      return indexMatched ? "justMatched" : "justMismatched";
    }

    return indexMatched ? "visible" : "hidden";
  }

  generateCards() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);
    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result);
  }

  // Arrow fx for binding
  handleCardClick = index => {
    const { currentPair } = this.state;
    if (this.interval && !this.state.gameStarted) {
      clearInterval(this.interval);
    }
    this.setState({
      isActive: true,
      gameStarted: true
    });

    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] });
      return;
    }
    this.handleNewPairClosedBy(index);
  };

  handleNewPairClosedBy = index => {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state;

    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    this.guessesCount = newGuesses;
    const matched = cards[newPair[0]] === cards[newPair[1]];
    this.setState({
      currentPair: newPair,
      guesses: newGuesses
    });

    if (matched) {
      this.setState(
        {
          matchedCardIndices: [...matchedCardIndices, ...newPair]
        },
        () => {
          // let boardCompleted = false;
          // if (this.timerBoardCompleted) {
          //   console.log("I reached here to check board completed");

          //   boardCompleted = true;
          // }
          const boardCompleted =
            this.state.matchedCardIndices.length === this.state.cards.length;
          if (boardCompleted || this.timerBoardCompleted) {
            this.setState({
              isActive: !this.state.isActive,
              gameStarted: !this.state.gameStarted
            });
            this.props.gameRoomPlayerScore({
              score: this.state.score,
              gameroomId: this.currentGameRoomId,
              userId: this.props.user.id
            });
          }
        }
      );
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  };

  handleReset = e => {
    console.log("Reset is clicked", e.target.id);
    window.location.reload();
  };

  render() {
    const { cards, guesses } = this.state; //matchedCardIndices
    console.log(`logging the pathname:`, this.props.history.location.pathname);
    console.log(this.state, this.props);
    return (
      <div className="memory">
        <Timer
          boardcompleted={this.timerBoardCompleted}
          score={this.state.score}
          timer={this.state.timer}
          guesses={guesses}
        />
        {/* <GuessCount guesses={guesses} /> */}
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            key={index}
            index={index}
            onClick={this.handleCardClick}
          />
        ))}

        <ScoreBoard gameroomId={this.currentGameRoomId} />
        <Link to="/gamerooms" style={{ color: "pink" }}>
          <p>Back to Gameroom</p>
        </Link>
        <div>
          <button id={this.props.id} onClick={this.handleReset}>
            Start new Game!
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log("state of GR", state);
  return {
    rooms: state.gameRoom,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { gameRoomPlayerScore })(GameBoard);
