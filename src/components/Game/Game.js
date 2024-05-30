import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import { GuessInput } from './GuessInput';
import { Banner } from './Banner';
import { Keyboard } from './Keyboard';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = React.useState('');
  const [guessData, setGuessData] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState('playing');

  function handleGuess() {
    console.log({ guess })
    if (guess.length !== answer.length) {
      return;
    }
    let result = checkGuess(guess, answer);
    if (result.every(cell => cell.status === 'correct')) {
      setGameStatus('won');
    }

    if (guessData.length >= NUM_OF_GUESSES_ALLOWED - 1) {
      setGameStatus('lost');
    }
    setGuessData([...guessData, result]);
    setGuess('');
  }

  function restartGame() {
    setGuess('');
    setGuessData([]);
    setGameStatus('playing');
  }

  return (
    <>
      <div className="game-wrapper">
        <div className="guess-results">
        {
          Array.from(Array(NUM_OF_GUESSES_ALLOWED), (_, i) => {
            let currentGuess = guessData[i] ? guessData[i] : [];
            return (
              <p className="guess" key={crypto.randomUUID()}>
                {
                  Array.from(Array(answer.length), (_, j) => {
                    return (
                      <span className={`cell ${ currentGuess[j]?.status ?? '' }`} key={crypto.randomUUID()}>
                        {currentGuess[j]?.letter ?? ''}
                      </span>
                    )
                  })
                }
              </p>
            )
          })
        }
        </div>
        <GuessInput guess={guess} setGuess={setGuess} handleGuess={handleGuess} gameStatus={gameStatus} />
        <Keyboard guess={guess} setGuess={setGuess} handleGuess={handleGuess} guessData={guessData} />
        {
          guessData.length >= NUM_OF_GUESSES_ALLOWED || gameStatus !== 'playing'
            ? 
            <Banner gameStatus={gameStatus} answer={answer} guessNum={guessData.length} restartGame={restartGame} />           
            :
            null
        }
      </div>
    </>
  );
}

export default Game;
