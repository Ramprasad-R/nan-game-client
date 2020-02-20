import React, { useState, useEffect } from 'react';
// import GuessCount from '../GuessCount/GuessCount';

const Timer = (props) => {
  console.log(props)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const theGuesses = props.guesses
  const theBoardCompleted = props.boardCompleted

  function toggle() {
    setIsActive(!isActive);
  }
  if(theGuesses !== 0){
    toggle();
  }
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }
  if(theBoardCompleted){
    reset()
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  return (
    <div className="app">
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
        {/* <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button> */}
      </div>
    </div>
  );
};
export default Timer;