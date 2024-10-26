import React from 'react';
import { Link } from 'react-router-dom';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h1>🎰Instrucciones🎰</h1>
      <div className="instructions-text">
        <p>El <strong>Juego de Simón</strong> es un desafío de memoria que pondrá a prueba tu capacidad para recordar secuencias de colores.</p>
  
        <h2>Cómo jugar:</h2>
        <ol>
          <li><strong>Observa la secuencia:</strong> El juego mostrará una secuencia de colores. Presta atención, ya que en cada ronda se agregará un nuevo color a la secuencia.</li>
          <li><strong>Repite la secuencia:</strong> Una vez que la secuencia termine de reproducirse, es tu turno. Haz clic en los botones de colores en el mismo orden que los viste.</li>
          <li><strong>Avanza niveles:</strong> Con cada nivel, se añadirá un nuevo color a la secuencia, haciendo que sea más difícil recordar el orden.</li>
          <li><strong>Objetivo:</strong> El objetivo del juego es repetir la secuencia correctamente durante tantos niveles como sea posible. Si te equivocas, el juego terminará.</li>
          <li><strong>¡Compite por el mejor puntaje!</strong> Al final de la partida, tu nivel más alto se registrará en el ranking. ¡Intenta superar tu propio récord!</li>
        </ol>
  
        <h2>Controles:</h2>
        <ul>
          <li><strong>Botones de colores:</strong> Haz clic en los botones correspondientes para repetir la secuencia.</li>
          <li><strong>Botón de reinicio:</strong> Si te equivocas, podrás reiniciar el juego y comenzar de nuevo.</li>
        </ul>
  
        <p>¡Buena suerte y que disfrutes el desafío!</p>
  
        <Link to="/">
          <button className="instructions-button">A Jugar!</button>
        </Link>
      </div>
    </div>
  );
  
};

export default Instructions;
