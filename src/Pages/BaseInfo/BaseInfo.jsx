import styles from "./BaseInfo.module.css";
import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
//import * as XLSX from 'xlsx'; 
const BaseInfo = () => {

  const [displayName, setDisplayName] = useState("")
  const [displayVersao, setDisplayVersao] = useState("")
  const [displayPrompt, setDisplayPrompt] = useState("")
  const [file, setFile] = useState(null);

  const configuration = new Configuration({
    organization: "" ,
    apiKey: "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"
  })
  
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const  handleSubmit = async (e)=>{
    e.preventDefault()
    const chatBot ={
      displayName,
      displayVersao,
      displayPrompt,
      file
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
          <input type="text" name="displayVersao" required placeholder="Versão do Chatbot" value={displayVersao} onChange={(e) => setDisplayVersao(e.target.value)} />
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