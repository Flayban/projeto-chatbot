import styles from "./Chat.module.css"
import React, { useState } from 'react';
const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage) {
      setMessages([ {text: inputMessage, sent: true},...messages])
      setInputMessage('')
    }
 }
  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>{messages.map((message, index) => (
            <div key={index} className={message.sent ? 'message messageSent' : 'message messageReceived'}>
              {message.text}
            </div>
          ))}
        </div>
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className={styles.inputField} placeholder="Escreva sua mensagem..."/>
          <button type="submit" className={styles.sendButton}>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default Chat