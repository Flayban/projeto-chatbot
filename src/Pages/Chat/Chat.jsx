import styles from "./Chat.module.css";
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"
const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const inputRef = useRef(null)

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
            <span className={styles.senderInfo}>{message.sent ? 'Você' : 'Bot'}</span>
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