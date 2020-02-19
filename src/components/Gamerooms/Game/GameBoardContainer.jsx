import React, { Component } from "react";
import shuffle from "lodash.shuffle";
import Card from "./Card/Card";
import GuessCount from "./GuessCount/GuessCount";
import { connect } from "react-redux";
import { gameRoomPlayerScore } from "../../../actions/gameRooms";

import "./GameBoardContainer.css";
// import HallOfFame, { FAKE_HOF } from './components/halloffame/HallOfFame'

const SIDE = 2;
const SYMBOLS = "🎃🎂🎅🐰🎥🍂👨💪🎓👩🎊🏊👑☪🌱☘☀🏈💘⚽";
const VISUAL_PAUSE_MSECS = 750;

class GameBoard extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: []
  };

  // componentDidMount(){
  //   console.log(`logging the pathname:`,this.props.history.location.pathname)
  //   this.props.gameRoomPlayerScore({
  //     score: this.state.guesses,
  //     gameroomId: this.props.location.pathname.split("/").pop(),
  //     userId: this.props.user.id,

  //   })
  // }

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

    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] });
      return;
    }

    this.handleNewPairClosedBy(index);
  };

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state;

    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    const matched = cards[newPair[0]] === cards[newPair[1]];
    this.setState({ currentPair: newPair, guesses: newGuesses });
    if (matched) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, ...newPair]
      });
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  }

  render() {
    const { cards, guesses, matchedCardIndices } = this.state;
    const boardCompleted = matchedCardIndices.length === cards.length;
    console.log(`logging the pathname:`, this.props.history.location.pathname);
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            key={index}
            index={index}
            onClick={this.handleCardClick}
          />
        ))}
        {/* {won && <HallOfFame entries={FAKE_HOF} />} */}
        {boardCompleted &&
          this.props.gameRoomPlayerScore({
            score: guesses,
            gameroomId: this.props.location.pathname.split("/").pop(),
            userId: this.props.user.id
          })}
        {/* {won} */}
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

export default connect(mapStateToProps, { gameRoomPlayerScore })(GameBoard);
