import React, { useReducer, useEffect, useCallback } from 'react';
import SimonButton from '../SimonButton/SimonButton';
import { gameReducer, initialState } from '../../reducers/gameReducer/gameReducer';
import useSimonSequence from '../hooks/useSimonSequence';
import { Link } from 'react-router-dom';
import './SimonGame.css';

// Sonidos de botones
const sounds = {
  red: new Audio('/sounds/red.mp3'),
  green: new Audio('/sounds/green.mp3'),
  blue: new Audio('/sounds/blue.mp3'),
  yellow: new Audio('/sounds/yellow.mp3')
};

const SimonGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { gameSequence, generateNextColor, resetSequence } = useSimonSequence();

  // Función para reproducir sonido basado en el color
  const playSound = (color) => {
    const sound = sounds[color];
    if (sound) {
      sound.currentTime = 0; // Reinicia el sonido si ya está sonando
      sound.play();
    }
  };

  // Maneja la secuencia visualmente para que los botones parpadeen
  const playSequence = useCallback(() => {
    let index = 0;

    const interval = setInterval(() => {
      const color = gameSequence[index];
      flashButton(color);
      playSound(color); // Reproduce el sonido al activar el botón
      index++;

      if (index >= gameSequence.length) {
        clearInterval(interval);
        dispatch({ type: 'PLAYER_TURN' });
      }
    }, 1000);
  }, [gameSequence, dispatch]);

  // Parpadea un botón dado su color
  const flashButton = (color) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 500);
    }
  };

  // Reproduce la secuencia cada vez que cambia la secuencia del juego
  useEffect(() => {
    if (gameSequence.length > 0 && state.isPlayingSequence) {
      playSequence();
    }
  }, [gameSequence, playSequence, state.isPlayingSequence]);

  const handleButtonClick = (color) => {
    if (!state.isPlayerTurn || state.isGameOver || state.isPlayingSequence) return;

    flashButton(color);
    playSound(color); // Reproduce el sonido al hacer clic
    dispatch({ type: 'PLAYER_INPUT', payload: color });

    const currentPlayerSequence = [...state.playerSequence, color];
    const isCorrect = gameSequence[currentPlayerSequence.length - 1] === color;

    if (!isCorrect) {
      saveScore(state.level);
      dispatch({ type: 'GAME_OVER' });
    } else if (currentPlayerSequence.length === gameSequence.length) {
      setTimeout(() => {
        dispatch({ type: 'NEXT_LEVEL' });
        generateNextColor();
      }, 1000);
    }
  };

  const handleStartGame = () => {
    if (!state.hasGameStarted) {
      resetSequence();
      dispatch({ type: 'START_GAME' });
      generateNextColor();
    }
  };

  const handleRestart = () => {
    resetSequence();
    dispatch({ type: 'RESET_GAME' });
    generateNextColor();
  };

  const saveScore = (level) => {
    const currentScores = JSON.parse(localStorage.getItem('scores')) || [];
    const newScore = {
      id: Date.now(),
      score: level,
    };
    const updatedScores = [...currentScores, newScore];
    localStorage.setItem('scores', JSON.stringify(updatedScores));
  };

  return (<>

    <div className="simon-game">
    <h1>SIMON GAME</h1>
      <div className="navigation-buttons">
        <Link to="/instructions" className="link">
          <button className="help-button">?</button>
        </Link>
        <Link to="/ranking" className="link">
          <button className="ranking-button">🥇</button>
        </Link>
      </div>

      <div className="game-status">
        {state.isGameOver ? (
          <>
            <h2>¡Game Over!</h2>
            <button onClick={handleRestart} className="instructions-button">Reiniciar Juego</button>
          </>
        ) : (
          <h2>Nivel: {state.level}</h2>
        )}
      </div>

      <div className="simon-buttons">
        <SimonButton color="red" onClick={() => handleButtonClick('red')} />
        <SimonButton color="green" onClick={() => handleButtonClick('green')} />
        <SimonButton color="blue" onClick={() => handleButtonClick('blue')} />
        <SimonButton color="yellow" onClick={() => handleButtonClick('yellow')} />
      </div>

      {!state.hasGameStarted && (
        <button className="instructions-button" onClick={handleStartGame}>
          Iniciar Juego
        </button>
      )}
    </div>
    </>
  );
};

export default SimonGame;
