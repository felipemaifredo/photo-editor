import './App.css';
import { useState, ChangeEvent, useRef } from 'react';
import { AiOutlineRotateRight } from "react-icons/ai";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { MdOutlineTextRotateVertical } from "react-icons/md";
import { MdOutlineTextRotateUp } from "react-icons/md";

function App() {
  const inputImageRef = useRef<HTMLImageElement | null>(null);
  const [buttonClicked, setButtonClicked] = useState(0);
  const [imagemURL, setImagemURL] = useState('');

  const [imageFilters, setImageFilters] = useState({
    brilho: '100',
    contraste: '100',
    saturacao: '100',
    cinza: '0',
    invercao: '0',
  });

  const handleButtonClick = (buttonIndex: number) => {
    setButtonClicked(buttonIndex);
  };

  const changeProperty = (e: ChangeEvent<HTMLInputElement>) => {
    setImageFilters({ ...imageFilters, [e.target.name]: e.target.value });
    attImage();
  }

  const handleImagemSelecionada = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setImagemURL(URL.createObjectURL(file));
      cleamFilters();
    } else {
      setImagemURL('');
    };
  };

  const cleamFilters = () => {
    setImageFilters({
      brilho: '100',
      contraste: '100',
      saturacao: '100',
      cinza: '0',
      invercao: '0',
    });
    attImage();
  };

  function attImage() {
    if (inputImageRef.current) {
      inputImageRef.current.style.filter = `
        brightness(${imageFilters.brilho}%) 
        contrast(${imageFilters.contraste}%) 
        saturate(${imageFilters.saturacao}%) 
        grayscale(${imageFilters.cinza}%) 
        invert(${imageFilters.invercao}%)
      `;
    }
  };

  function downloadImage() {
    alert('opa')
  }

  return (
    <div className="App">
      <div className='editor-container'>
        <div className='bts-container'>
          {imagemURL && 
            <button onClick={cleamFilters}>Limpar Filtros</button>
          }
          <label>
            <span> Nova Imagem </span>
            <input id='input-file' type="file" onChange={handleImagemSelecionada} />
          </label>
          {imagemURL && 
            <button onClick={downloadImage}>Salvar</button>
          }
        </div>
        {imagemURL &&
          <div className='image-container'>
            <img src={imagemURL} alt='Imagem para edição' ref={inputImageRef} />
          </div>
         }
        {imagemURL && 
          <div className='rotate-btns-container'>
            <button> <AiOutlineRotateLeft /> </button>
            <button> <AiOutlineRotateRight /> </button>
            <button> <MdOutlineTextRotateVertical /> </button>
            <button> <MdOutlineTextRotateUp /> </button>
          </div>
        }
        {imagemURL && 
          <div className='controls-container'>
            <div className='range-inputs-container'>
              {buttonClicked !== null && (
                <div className="range-inputs-box">
                  {buttonClicked === 0 && (
                    <>
                      <p>{imageFilters.brilho}</p>          
                      <input type="range" name='brilho' min="0" max="200" value={imageFilters.brilho} onChange={(e) => {changeProperty(e)}}/>
                    </>
                  )}
                  {buttonClicked === 1 && (
                    <>
                      <p>{imageFilters.contraste}</p> 
                      <input type="range" name='contraste' min="0" max="200" value={imageFilters.contraste} onChange={(e) => {changeProperty(e)}}/>
                    </>
                  )}
                  {buttonClicked === 2 && (
                    <>
                      <p>{imageFilters.saturacao}</p> 
                      <input type="range" name='saturacao' min="0" max="200" value={imageFilters.saturacao} onChange={(e) => {changeProperty(e)}}/>
                    </>
                  )}
                  {buttonClicked === 3 && (
                    <>
                      <p>{imageFilters.cinza}</p> 
                      <input type="range" name='cinza' min="0" max="100" value={imageFilters.cinza} onChange={(e) => {changeProperty(e)}}/>
                    </>
                  )}
                  {buttonClicked === 4 && (
                    <>
                      <p>{imageFilters.invercao}</p> 
                      <input type="range" name='invercao' min="0" max="100" value={imageFilters.invercao} onChange={(e) => {changeProperty(e)}}/>
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
        }
      </div>
    </div>
  );
}

export default App;
