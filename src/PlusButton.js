// PlusButton.js
import React from 'react';
import './index.css';  // Importando o arquivo de estilo para o botão

const PlusButton = ({ onClick }) => {
  return (
    <button className="plus-button" onClick={onClick}>
      +
    </button>
  );
};

export default PlusButton;
