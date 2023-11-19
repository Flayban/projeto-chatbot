import styles from "./BaseInfo.module.css";
import { useState } from "react";
import axios from "axios"


const BaseInfo = () => {
  const [displayName, setDisplayName] = useState("")
  const [displayVersao, setDisplayVersao] = useState("")
  const [displayPrompt, setDisplayPrompt] = useState("")
  const [file, setFile] = useState(null);

  const optionsVersion =[
    "text-davinci-003",
    "text-davinci-002",
    "text-davinci-001",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001"
  ]

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const  handleSubmit = async (e)=>{
    e.preventDefault()
    const chatBot ={
      nome: displayName,
      versao: displayVersao,
      prompt: displayPrompt
    }

    try {
      await axios.post('http://localhost:3030/config/poste', chatBot)  
    } catch (error) {
      console.log("error: ", error)
    }
    //Ação do chatbot        
  }

  return (
    <div className={styles.BaseInfo}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome do Chatbot</span>
          <input type="text" name="displayName" required placeholder="Nome do Chatbot" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          <span>Versão do Chatbot</span>          
          <select name="displayVersao" options = {optionsVersion} required onChange={(e) => setDisplayVersao(e.target.value)}>
            <option value="" disabled selected hidden>Escolha a versão desejada</option>
            <option value={optionsVersion[0]}>{optionsVersion[0]}</option>
            <option value={optionsVersion[1]}>{optionsVersion[1]}</option>
            <option value={optionsVersion[2]}>{optionsVersion[2]}</option>
            <option value={optionsVersion[3]}>{optionsVersion[3]}</option>
            <option value={optionsVersion[4]}>{optionsVersion[4]}</option>
            <option value={optionsVersion[5]}>{optionsVersion[5]}</option>
          </select>
        </label>
        <label>
          <span>Prompt</span>
          <textarea type="bory" name="displayPrompt" required placeholder="Prompt" value={displayPrompt} onChange={(e) => setDisplayPrompt(e.target.value)} />
        </label>
        <label>
          <span>Documentos</span>
          <input type="file" accept=".xlsx" name="displayDocumentos" placeholder="Exemplo.xlsx" onChange={handleFileUpload} />
        </label>
        <button className="btn" type="submit">Salvar</button>
      </form>
    </div>
  )
}

export default BaseInfo