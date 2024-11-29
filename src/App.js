import React, { useState } from 'react';
import RadioButtons from './RadioButtons';
import Textarea from './Textarea';
import './index.css';
import OptionText from './OptionText';
import PlusButton from './PlusButton';
import MinusButton from './MinusButton';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [flag, setFlag] = useState(false);
  const [optionTexts, setOptionTexts] = useState([]);
  const [checkboxes, setCheckboxes] = useState({}); // Para armazenar o estado dos checkboxes
  const [checkedOptions, setCheckedOptions] = useState([]); // Para armazenar as opções selecionadas
  const [verdadeiroOuFalso, setVerdadeiroOuFalso] = useState(''); // Novo estado para armazenar a seleção de verdadeiro ou falso

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setFlag(value !== 'Verdadeiro Ou Falso');
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handlePlusButtonClick = () => {
    setOptionTexts([
      ...optionTexts,
      { id: Date.now(), text: '' }
    ]);
  };

  const handleOptionTextChange = (id, text) => {
    setOptionTexts(optionTexts.map(option =>
      option.id === id ? { ...option, text } : option
    ));
  };

  const handleMinusButtonClick = (id) => {
    setOptionTexts(optionTexts.filter(option => option.id !== id));
    const newCheckboxes = { ...checkboxes };
    delete newCheckboxes[id];
    setCheckboxes(newCheckboxes);
  };

  const handleCheckboxChange = (id) => {
    const newCheckboxes = { ...checkboxes, [id]: !checkboxes[id] };
    setCheckboxes(newCheckboxes);

    // Atualizar a lista de opções selecionadas (checkedOptions)
    const newCheckedOptions = optionTexts
      .filter(option => newCheckboxes[option.id]) // Filtra as opções marcadas
      .map(option => option.text); // Retorna os textos dessas opções

    setCheckedOptions(newCheckedOptions);
  };

  const handleVerdadeiroOuFalsoChange = (event) => {
    setVerdadeiroOuFalso(event.target.value);
    // Atualizar checkedOptions com "Verdadeiro" ou "Falso" dependendo da seleção
    setCheckedOptions([event.target.value]);
  };

  const collectData = () => {
    const data = {
      enunciado: textAreaValue, // Enunciado da questão
      type: selectedOption,
      options: optionTexts.map(option => option.text), // Todas as opções
      checkedOptions, // Incluir as opções que estão marcadas (armazenadas em checkedOptions)
    };

    console.log("Dados coletados:", JSON.stringify(data, null, 2));
    return data;
  };

  const handleSubmit = async () => {
    const data = collectData();

    try {
      // Enviar dados para a rota POST do servidor
      const response = await fetch('http://localhost:3030/pergunta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Corpo da requisição com os dados coletados
      });

      const result = await response.json();
      if (response.ok) {
        alert('Questão enviada com sucesso!');
        console.log(result);
      } else {
        alert('Erro ao enviar questão!');
        console.error(result);
      }
    } catch (error) {
      console.error('Erro de rede ou servidor:', error);
      alert('Ocorreu um erro ao enviar a questão');
    }
  };

  return (
    <div className="app-container">
      <RadioButtons
        selectedOption={selectedOption}
        onChange={handleRadioChange}
      />
      
      <Textarea
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />

      {/* Exibir os radio buttons de Verdadeiro ou Falso se o tipo for "Verdadeiro Ou Falso" */}
      {selectedOption === 'Verdadeiro Ou Falso' && (
        <div>
          <label style={{ marginRight: '20px' }}>
            <input
              type="radio"
              value="Verdadeiro"
              checked={verdadeiroOuFalso === 'Verdadeiro'}
              onChange={handleVerdadeiroOuFalsoChange}
            />
            Verdadeiro
          </label>
          <label>
            <input
              type="radio"
              value="Falso"
              checked={verdadeiroOuFalso === 'Falso'}
              onChange={handleVerdadeiroOuFalsoChange}
            />
            Falso
          </label>
        </div>
      )}

      {/* Se "Verdadeiro Ou Falso" não estiver selecionado, exibe as opções criadas pelo usuário */}
      {selectedOption !== 'Verdadeiro Ou Falso' && (
        <div className="option-texts-container">
          {optionTexts.map(option => (
            <div key={option.id} className="option-text-wrapper">
              <OptionText 
                value={option.text} 
                onChange={(e) => handleOptionTextChange(option.id, e.target.value)} 
              />
              <input
                type="checkbox"
                checked={checkboxes[option.id] || false}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <MinusButton onClick={() => handleMinusButtonClick(option.id)} />
            </div>
          ))}
        </div>
      )}

      {flag && (
        <div className="plus-button-container">
          <PlusButton onClick={handlePlusButtonClick} />
          <h3>Pressione para adicionar uma opção de resposta</h3>
        </div>
      )}

      <button className="collect-data-button" onClick={handleSubmit}>
        Enviar questão
      </button>
    </div>
  );
};

export default App;
