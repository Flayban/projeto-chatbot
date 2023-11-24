import styles from "./Chat.module.css";
import React, { useState, useEffect, useRef} from 'react';
import axios from "axios"
const Chat = () => {
  //variaveis
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [configData, setConfigData] = useState([])
  const [botNome, setBotNome] = useState('')

  //Obtem os dados de config do MongoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/config/get/655a1ded6692ac068f993e1c"
      );
      // Atualizar o estado com os dados obtidos   
      setConfigData(response.data)
      console.log(response.data)

    } catch (error) {
      console.log("error fetching data: ", error);
    }
  }   
  //Inicia o fetchData automaticamente ao abrir a pagina
  useEffect(() => {
    fetchData()    
  }, [])
//Ao recolher os dados do BD, aloca o nome do chat nos balões de mensagens do bot
  useEffect(() => {
    if (configData) {
      setBotNome(configData.nome)      
    }
  }, [configData]) 


  //Monta e estrutura de mensagens escadeadas e envia mensagem do user para o chat e retorna a resposta do chat
  const handleSubmit = async() => {    
    if (inputMessage) {
      setLoading(true)
      configData.user= inputMessage      
      const newMessages = [ ...messages, {text: inputMessage, sent: true}]
      setMessages(newMessages)
      setInputMessage('')   
      try {
        const response = await axios.post('http://localhost:3333/api/call', configData)
        setMessages([...newMessages,{text:response.data, sent:false}])
      } catch (error) {
        console.log("Error:", error)
      }finally{
        setLoading(false)
      }
    }       
  }

  //Comando que configura que ao pressionar o botão enter a mensagem sera enviada 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && loading === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  }
  //Ao iniciar a pagina a text-area estara em foco
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  return (    
    <div className={styles.chatContainer}>
      <div className={styles.messages}> {messages.map((message, index) => (  
          
          <div key={index} className={message.sent ? styles.messageSent : styles.messageReceived}>
            <span className={styles.senderInfo}>{message.sent ? 'Você' : botNome}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        
        <textarea ref = {inputRef} type="body" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} className={styles.inputField} placeholder="Escreva sua mensagem..."/>
        {!loading && <button type="submit" className={styles.sendButton}>Enviar</button> }
        {loading && <button type="submit" className={styles.sendButton} disabled>Aguarde</button> }
        
      </form>
    </div>  
  )
}

export default Chat