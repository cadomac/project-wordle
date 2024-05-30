import React from "react";

export function GuessInput({ guess, setGuess, handleGuess, gameStatus }) {
  return (
    <form 
      onSubmit={e => {
        e.preventDefault();
        handleGuess();
      }} 
      className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input disabled={gameStatus !== 'playing'} value={guess} onChange={e => setGuess(e.target.value.toUpperCase())} type="text" id="guess-input" />
    </form>
  )
}