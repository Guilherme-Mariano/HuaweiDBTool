// Textarea.js
import React from 'react';
import './index.css'; // Importando o arquivo CSS

const Textarea = ({ value, onChange }) => {
  return (
    <div className="textarea-container">
      <label htmlFor="textarea" className="textarea-label">Enunciado da questão</label>
      <textarea
        id="textarea"
        value={value}
        onChange={onChange} // Passando a função para atualizar o valor
        className="textarea-input"
        placeholder="Enunciado..."
      />
    </div>
  );
};

export default Textarea;
