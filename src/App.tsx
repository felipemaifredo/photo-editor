import './App.css';
import { useState, ChangeEvent, useRef } from 'react';
import { AiOutlineRotateRight } from "react-icons/ai";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { MdOutlineTextRotateVertical } from "react-icons/md";
import { MdOutlineTextRotateUp } from "react-icons/md";

function App() {
  const InputImage = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(0);
  const [brilho, setBrilho] = useState('100');
  const [contraste, setContraste] = useState('100');
  const [saturacao, setSaturacao] = useState('100');
  const [cinza, setCinza] = useState('0');
  const [invercao, setIvercao] = useState('0');
  const [imagemURL, setImagemURL] = useState('');

  const handleButtonClick = (buttonIndex: number) => {
    setButtonClicked(buttonIndex);
  };

  const changeBrilho = (e: ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    setBrilho(valueInput)
  }

  const changeContraste = (e: ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    setContraste(valueInput)
  }

  const changeSaturacao = (e: ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    setSaturacao(valueInput)
  }

  const changeCinza = (e: ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    setCinza(valueInput)
  }

  const changeInvercao = (e: ChangeEvent<HTMLInputElement>) => {
    let valueInput = e.target.value;
    setIvercao(valueInput)
  }

  const handleImagem1Selecionada = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setImagemURL(URL.createObjectURL(file))
    } else {
      setImagemURL('');
    }
  };

  const cleamFilters = () => {
    setBrilho('100')
    setContraste('100')
    setSaturacao('100')
    setCinza('0')
    setIvercao('0')
  }

  return (
    <div className="App">
      <div className='editor-container'>
        <div className='bts-container'>
          <button onClick={cleamFilters}>Limpar Filtros</button>
          <label>
            <span> Nova Imagem </span>
            <input ref={InputImage} id='input-file' type="file" onChange={handleImagem1Selecionada} />
          </label>
          <button>Salvar</button>
        </div>
        <div className='image-container'>
          {imagemURL && ( <img src={imagemURL} alt='Imagem para edição' /> )}
        </div>
        <div className='rotate-btns-container'>
          <button> <AiOutlineRotateLeft /> </button>
          <button> <AiOutlineRotateRight /> </button>
          <button> <MdOutlineTextRotateVertical /> </button>
          <button> <MdOutlineTextRotateUp /> </button>
        </div>
        <div className='controls-container'>
          <div className='range-inputs-container'>
            {buttonClicked !== null && (
              <div className="range-inputs-box">
                {buttonClicked === 0 && (
                  <>
                    <p>{brilho}</p>          
                    <input type="range" name='brilho' min="0" max="200" value={brilho} onChange={(e) => {changeBrilho(e)}}/>
                  </>
                )}
                {buttonClicked === 1 && (
                  <>
                    <p>{contraste}</p> 
                    <input type="range" name='brilho' min="0" max="200" value={contraste} onChange={(e) => {changeContraste(e)}}/>
                  </>
                )}
                {buttonClicked === 2 && (
                  <>
                    <p>{saturacao}</p> 
                    <input type="range" name='brilho' min="0" max="200" value={saturacao} onChange={(e) => {changeSaturacao(e)}}/>
                  </>
                )}
                {buttonClicked === 3 && (
                  <>
                    <p>{cinza}</p> 
                    <input type="range" name='brilho' min="0" max="100" value={cinza} onChange={(e) => {changeCinza(e)}}/>
                  </>
                )}
                {buttonClicked === 4 && (
                  <>
                    <p>{invercao}</p> 
                    <input type="range" name='brilho' min="0" max="100" value={invercao} onChange={(e) => {changeInvercao(e)}}/>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="select-input-btns-container">
            <button className={buttonClicked === 0 ? 'active' : ''} onClick={() => handleButtonClick(0)} > Brilho </button> 
            <button className={buttonClicked === 1 ? 'active' : ''} onClick={() => handleButtonClick(1)} > Contraste </button>
            <button className={buttonClicked === 2 ? 'active' : ''} onClick={() => handleButtonClick(2)} > Saturação </button>     
            <button className={buttonClicked === 3 ? 'active' : ''} onClick={() => handleButtonClick(3)} > Cinza </button>
            <button className={buttonClicked === 4 ? 'active' : ''} onClick={() => handleButtonClick(4)} > Inversão </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
