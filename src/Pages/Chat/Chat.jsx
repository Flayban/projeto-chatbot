import styles from "./Chat.module.css";
import React, { useState, useEffect, useRef, useCallback} from 'react';
import axios from "axios"
const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const inputRef = useRef(null)
  
  const [configData, setConfigData] = useState([])
  const [botNome, setBotNome] = useState('')

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
  
  const initialPrompt = useCallback( async()=>{      
    try {
      await axios.post('http://localhost:3333/api/call', {prompt: configData.prompt})      
    } catch (error) {
      console.log("Error:", error)
    }      
  }, [configData.prompt])
   
  useEffect(() => {
    fetchData()    
  }, [])

  useEffect(() => {
    if (configData) {
      setBotNome(configData.nome)      
    }
  }, [configData])

  useEffect(() => {
    if (configData.prompt) {
      initialPrompt()
    }
  }, [configData.prompt, initialPrompt])

  const handleSubmit = async() => {    
    if (inputMessage) {
      const newMessages = [ ...messages, {text: inputMessage, sent: true}]
      setMessages(newMessages)
      setInputMessage('')   
      try {
        const response = await axios.post('http://localhost:3333/api/call', {prompt: inputMessage})
        setMessages([...newMessages,{text:response.data, sent:false}])
      } catch (error) {
        console.log("Error:", error)
      }  
    }       
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }
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
        <button type="submit" className={styles.sendButton}>Enviar</button>
      </form>
    </div>  
  )
}

export default Chat