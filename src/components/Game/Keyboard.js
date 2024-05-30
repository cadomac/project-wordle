import React from "react";

const firstRow = 'QWERTYUIOP'.split('');
const secondRow = 'ASDFGHJKL'.split('');
const thirdRow = 'ZXCVBNM'.split('');
const keys = [firstRow, secondRow, thirdRow];

function getStatusByLetter(guesses) {
  const statusObj = {};
  const allLetters = guesses.flat();

  allLetters.forEach(({letter, status}) => {
    const currentStatus = statusObj[letter];

    if (currentStatus === undefined) {
      statusObj[letter] = status;
      return;
    }

    const STATUS_RANKS = {
      correct: 1,
      misplaced: 2,
      incorrect: 3
    };

    const currentStatusRank = STATUS_RANKS[currentStatus];
    const newStatusRank = STATUS_RANKS[status];

    if (newStatusRank < currentStatusRank) {
      statusObj[letter] = status;
    }
  });

  return statusObj;
}

export function Keyboard({ guess, setGuess, guessData, handleGuess }) {
  const statusByLetter = getStatusByLetter(guessData);

  return (
    <div className="keyboard">
      {
        keys.map((row) => {
          return (
          <div key={crypto.randomUUID()} className="keyboard-row">
            {
              row.map((key) => {
                return(
                  <button className={`keyboard-key ${statusByLetter[key]}`} key={crypto.randomUUID()} onClick={() => {
                    setGuess(guess + key)
                  }}>{key}</button>
                )
              })
            }
          </div>
          )
          }
        )
      }
      <div className="keyboard-row"><button className="keyboard-key" onClick={handleGuess}>SUBMIT</button></div>
    </div>
  )
}