import styles from "./BaseInfo.module.css";
import { useState, useEffect } from "react";
import axios from "axios"

const BaseInfo = () => {
  const [displayName, setDisplayName] = useState("")
  const [displayVersao, setDisplayVersao] = useState("")
  const [displayPrompt, setDisplayPrompt] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [conteudoFile, setConteudoFile] = useState('')
  const [configData, setConfigData] = useState([]);
 
  const optionsVersion =[
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-16k-0613"
  ]

  const handleFileUpload = async (event) => {
    setFile(event.target.files[0])   
    
  }

  useEffect(()=>{
    const readArquivo = async () => {
      if (file) {
        try {
          const content = await readArquivoAsync(file)
          setConteudoFile(content)
        } catch (error) {
          console.error('Erro ao ler o arquivo:', error)
        }
      }
    }
    readArquivo()
  },[file])

  const readArquivoAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        resolve(e.target.result)
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsText(file)
    });
  };

  const  handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const chatBot ={
      nome: displayName,
      versao: displayVersao,
      prompt: displayPrompt,
      file: conteudoFile,
      user:''
    }
    //Update config bot
    try {
      await axios.patch('http://localhost:3030/config/patch/655a1ded6692ac068f993e1c', chatBot)  
    }catch (error) {
      console.log("error: ", error)
    }finally{
      setLoading(false)
    }            
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/config/get/655a1ded6692ac068f993e1c"
      );
      // Atualizar o estado com os dados obtidos   
      setConfigData(response.data);
      console.log(response.data)

    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (configData) {
      setDisplayName(configData.nome);
      setDisplayVersao(configData.versao);
      setDisplayPrompt(configData.prompt);
    }
  }, [configData])

  
  return (
    <div className={styles.BaseInfo}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome do Chatbot</span>
          <input type="text" name="displayName" required placeholder="Nome do Chatbot" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
        </label>
        <label>
          <span>Versão do Chatbot</span>          
          <select value={displayVersao} name="displayVersao" options = {displayVersao} required onChange={(e) => setDisplayVersao(e.target.value)}>
            <option value={optionsVersion[0]}>{optionsVersion[0]}</option>
            <option value={optionsVersion[1]}>{optionsVersion[1]}</option>
            <option value={optionsVersion[2]}>{optionsVersion[2]}</option>
            <option value={optionsVersion[3]}>{optionsVersion[3]}</option>
          </select>
        </label>
        <label>
          <span>Prompt</span>
          <textarea type="bory" name="displayPrompt" required placeholder="Prompt" value={displayPrompt} onChange={(e) => setDisplayPrompt(e.target.value)} />
        </label>
        <label>
          <span>Documentos</span>
          <input type="file" accept=".txt" name="displayDocumentos" placeholder="Exemplo.txt" onChange={handleFileUpload} />
        </label>
        {!loading && <button className="btn" type="submit">Salvar</button>}
        {loading && <button className="btn" type="submit" disabled>Salvando</button>}
      </form>
    </div>
  )
}

export default BaseInfo