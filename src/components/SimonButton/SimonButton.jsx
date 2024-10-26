import React from 'react';
import './SimonButton.css';

const SimonButton = ({ color, onClick }) => {
  return (
    <div
      id={color}
      className={`simon-button ${color}`}
      onClick={onClick}
    ></div>
  );
};

export default SimonButton;
