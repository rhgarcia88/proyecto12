import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Ranking.css';

const Ranking = () => {
  const [scores, setScores] = useState([]);

  // Leer las puntuaciones guardadas desde localStorage al cargar la página
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(savedScores);
  }, []);

  return (
    <div className="ranking-container">
    <div className="ranking">
      <h1>Ranking</h1>
      {scores.length > 0 ? (
        <ol>
          {scores
            .sort((a, b) => b.score - a.score) // Ordenar de mayor a menor puntaje
            .map((player, index) => (
              <li key={player.id}>
                <b>{index + 1}.</b> {player.score} puntos
              </li>
            ))}
        </ol>
      ) : (
        <p>No hay puntuaciones disponibles.</p>
      )}
      <Link to="/">
        <button className="instructions-button">Volver a Jugar</button>
      </Link>
    </div>
    </div>
    
  );
};

export default Ranking;
