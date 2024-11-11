// App.js
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
  };

  const collectData = () => {
    const data = {
      selectedOption,
      textAreaValue,
      optionTexts: optionTexts.map(option => option.text)
    };
    console.log("Dados coletados:", JSON.stringify(data, null, 2));
    return data;
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

      {
        //flag && <OptionText />
      } 
      
      <div className="option-texts-container">
        {optionTexts.map(option => (
          <div key={option.id} className="option-text-wrapper">
            <OptionText 
              value={option.text} 
              onChange={(e) => handleOptionTextChange(option.id, e.target.value)} 
            />
            <MinusButton onClick={() => handleMinusButtonClick(option.id)} />
          </div>
        ))}
      </div>

      {flag && (
        <div className="plus-button-container">
          <PlusButton onClick={handlePlusButtonClick} />
          <h3>Pressione para adicionar uma opção de resposta</h3>
        </div>
      )}

<button className="collect-data-button" onClick={collectData}>
  Enviar questão
</button>

    </div>
  );
};

export default App;
