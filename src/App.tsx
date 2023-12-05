import './App.css';
import { useState, ChangeEvent, useRef, MutableRefObject } from 'react';
import { AiOutlineRotateRight } from "react-icons/ai";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { MdOutlineTextRotateVertical } from "react-icons/md";
import { MdOutlineTextRotateUp } from "react-icons/md";

function App() {
  const inputImageRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(0);
  const [imagemURL, setImagemURL] = useState('');
  const [rotacaoAtual, setRotacaoAtual] = useState<number>(0);
  const [XAtual, setXAtual] = useState<number>(1);
  const [YAtual, setYAtual] = useState<number>(1);

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
  };

  const handleImagemSelecionada = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setImagemURL(URL.createObjectURL(file));
      cleamFilters();
    } else {
      setImagemURL('');
    };
  };

  const rotate90 = (guidance: boolean) => {
    let newRotacao;
    
    if (guidance) {
      newRotacao = rotacaoAtual + 90;
      setRotacaoAtual(newRotacao);
      if (newRotacao === 360) {
        setRotacaoAtual(0);
      }

    } else {
      newRotacao = rotacaoAtual - 90;
      setRotacaoAtual(newRotacao);
      if (newRotacao === -360) {
        setRotacaoAtual(0);
      }
    }

    // Construa a expressão de rotação usando a nova rotação
    let rotateExpression = `rotate(${newRotacao}deg)`;

    // Aplique a transformação ao seu elemento (substitua "elementRef" pelo seu ref)
    if (inputImageRef.current) {
      inputImageRef.current.style.transform = rotateExpression;
    }
  };

  const translateX = () => {
    // Atualiza o estado com o novo valor de XAtual
    setXAtual((prevXAtual) => (prevXAtual === 1 ? -1 : 1));
  
    // Obtém o valor atualizado de XAtual
    const newXAtual = XAtual === 1 ? -1 : 1;
  
    // Construa a expressão de escala usando o novo valor de XAtual e o valor atual de YAtual
    const scaleXExpression = `scaleX(${newXAtual}) scaleY(${YAtual})`;
  
    // Aplique a transformação ao seu elemento (substitua "inputImageRef" pelo seu ref)
    if (inputImageRef.current) {
      inputImageRef.current.style.transform = scaleXExpression;
    }
  };
  
  const translateY = () => {
    // Atualiza o estado com o novo valor de YAtual
    setYAtual((prevYAtual) => (prevYAtual === 1 ? -1 : 1));
  
    // Obtém o valor atualizado de YAtual
    const newYAtual = YAtual === 1 ? -1 : 1;
  
    // Construa a expressão de escala usando o valor atual de XAtual e o novo valor de YAtual
    const scaleYExpression = `scaleX(${XAtual}) scaleY(${newYAtual})`;
  
    // Aplique a transformação ao seu elemento (substitua "inputImageRef" pelo seu ref)
    if (inputImageRef.current) {
      inputImageRef.current.style.transform = scaleYExpression;
    }
  };
  
  const cleamFilters = () => {
    setImageFilters({
      brilho: '100',
      contraste: '100',
      saturacao: '100',
      cinza: '0',
      invercao: '0',
    });

    if (inputImageRef.current) {
      inputImageRef.current.style.transform = 'scaleX(1) scaleY(1)';
    }

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

  async function downloadImage() {
    // Verifica se há uma imagem carregada
    if (imagemURL && inputImageRef.current) {
      // Cria um canvas para desenhar a imagem com as configurações aplicadas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Carrega a imagem original no elemento de imagem
      const img = inputImageRef.current;
  
      // Ajusta o tamanho do canvas para o tamanho da imagem
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Aplica as transformações no contexto do canvas
      const rotate = rotacaoAtual;
      const flipX = XAtual;
      const flipY = YAtual;
  
      ctx?.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) ctx?.rotate((rotate * Math.PI) / 180);
  
      // Ajusta a escala separadamente para X e Y
      ctx?.scale(flipX, flipY);
  
      // Aplica os filtros diretamente no contexto do canvas
      if (ctx) {
        ctx.filter = `
        brightness(${imageFilters.brilho}%) 
        contrast(${imageFilters.contraste}%) 
        saturate(${imageFilters.saturacao}%) 
        grayscale(${imageFilters.cinza}%) 
        invert(${imageFilters.invercao}%)
      `;
      }
      
      // Desenha a imagem com todas as transformações no canvas
      ctx?.drawImage(img, -canvas.width / 2, -canvas.height / 2);
  
      // Cria uma imagem base64 da imagem no canvas
      const base64Image = canvas.toDataURL("image/png");
  
      // Cria um link para download
      const downloadLink = document.createElement("a");
      downloadLink.href = base64Image;
      downloadLink.download = "imagem_editada.png";
  
      // Adiciona o link ao corpo do documento
      document.body.appendChild(downloadLink);
  
      // Simula um clique no link para iniciar o download
      downloadLink.click();
  
      // Remove o link do corpo do documento
      document.body.removeChild(downloadLink);
    }
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
            <button onClick={() => rotate90(false)}> <AiOutlineRotateLeft /> </button>
            <button onClick={() => rotate90(true)}> <AiOutlineRotateRight /> </button>
            <button onClick={translateX} > <MdOutlineTextRotateVertical /> </button>
            <button onClick={translateY} > <MdOutlineTextRotateUp /> </button>
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
