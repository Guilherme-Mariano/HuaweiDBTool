import React, { useState } from 'react';

const MultipleCheckboxes = () => {
  // Inicializando o estado com 5 checkboxes, todos desmarcados
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });

  // Função para lidar com a mudança do estado de cada checkbox
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked, // Atualiza o valor do checkbox específico
    }));
  };

  return (
    <div>
      <h1>Selecione o tipo de questão</h1>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="checkbox1"
            checked={checkboxes.checkbox1} 
            onChange={handleChange} 
          />
          Verdadeiro Ou Falso {checkboxes.checkbox1 ? 'Marcado' : 'Desmarcado'}
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="checkbox2"
            checked={checkboxes.checkbox2} 
            onChange={handleChange} 
          />
          Resposta Única {checkboxes.checkbox2 ? 'Marcado' : 'Desmarcado'}
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="checkbox3"
            checked={checkboxes.checkbox3} 
            onChange={handleChange} 
          />
          Multipla Escolha {checkboxes.checkbox3 ? 'Marcado' : 'Desmarcado'}
        </label>
      </div>
    </div>
  );
};

export default MultipleCheckboxes;
