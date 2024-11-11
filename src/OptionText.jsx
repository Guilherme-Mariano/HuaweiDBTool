// Textarea.js
import React from 'react';
import './index.css'; // Importando o arquivo CSS

const OptionText = ({ value, onChange }) => {
  return (
    <div className="OptionText-container">
    
      <textarea
        id="OptionText"
        value={value}
        onChange={onChange}
        className="OptionText-input"
        placeholder="Opção de Resposta..."
      />
    </div>
  );
};

export default OptionText;

//<label htmlFor="textarea" className="textarea-label">Pergunta da questão</label>
