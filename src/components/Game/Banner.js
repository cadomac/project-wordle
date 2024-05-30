import React from "react";

export function Banner({ gameStatus, answer, guessNum, restartGame }) {
  return (
    <div className={`banner ${gameStatus === 'won' ? 'happy' : 'sad'}`}>
      <p>
        {
          gameStatus === 'won'
            ? `Congratulations! Got it in ${guessNum} guesses!`
            : `Sorry, the correct answer is ${answer}.`
        }
      </p>
      <button onClick={restartGame} className="restart-button">RESTART</button>
    </div>
  )
}