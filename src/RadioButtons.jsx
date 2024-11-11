// RadioButtons.js
import React from 'react';
import './index.css'; // Importando o arquivo CSS

const RadioButtons = ({ selectedOption, onChange }) => {
  return (
    <div className="radio-container">
      <h1>Escolha uma opção</h1>
      
      {/* Radio Buttons */}
      <div>
        <label className="radio-label">
          <input
            type="radio"
            name="option"
            value="Verdadeiro Ou Falso"
            checked={selectedOption === 'Verdadeiro Ou Falso'}
            onChange={onChange}
            className="radio-input"
          />
          Verdadeiro Ou Falso
        </label>
      </div>
      <div>
        <label className="radio-label">
          <input
            type="radio"
            name="option"
            value="Única Escolha"
            checked={selectedOption === 'Única Escolha'}
            onChange={onChange}
            className="radio-input"
          />
          Única Escolha
        </label>
      </div>
      <div>
        <label className="radio-label">
          <input
            type="radio"
            name="option"
            value="Multipla Escolha"
            checked={selectedOption === 'Multipla Escolha'}
            onChange={onChange}
            className="radio-input"
          />
          Multipla Escolha
        </label>
      </div>
    </div>
  );
};

export default RadioButtons;
