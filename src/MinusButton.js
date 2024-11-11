// MinusButton.js
import React from 'react';
import './index.css';  // Arquivo de estilo para o MinusButton

const MinusButton = ({ onClick }) => {
  return (
    <button className="minus-button" onClick={onClick}>
      -
    </button>
  );
};

export default MinusButton;
