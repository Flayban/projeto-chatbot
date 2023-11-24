import styles from "./Chat.module.css";
import React, { useState, useEffect, useRef} from 'react';
import axios from "axios"
const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
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
   
  useEffect(() => {
    fetchData()    
  }, [])

  useEffect(() => {
    if (configData) {
      setBotNome(configData.nome)      
    }
  }, [configData]) 

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
        setLoading(true)
      }
    }       
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && loading === false) {
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
        {!loading && <button type="submit" className={styles.sendButton}>Enviar</button> }
        {loading && <button type="submit" className={styles.sendButton} disabled>Aguarde</button> }
        
      </form>
    </div>  
  )
}

export default Chat