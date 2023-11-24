//dotenv
require('dotenv').config()
//express
const express = require('express')
const app = express()
app.use(express.json())
app.listen(process.env.PORT_CHATBOT)

//cors
const cors = require('cors')
app.use(cors())
app.options('*',  cors())

//openAI
const {OpenAI, ChatCompletionCreateParams} = require('openai')

const openia = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const informations = []
async function getInformations(){
  return 'Eu sou BeLife, chatBot da eLife Brasil'
}

//Recebe a mensagem do user juntamente com as configurações do bot e retorna a resposta do bot
app.post('/api/call', async (req, res) =>{
  const{nome, versao, prompt, file, user}= req.body;
  informations.push(prompt)
  const runner = openia.beta.chat.completions
    .runFunctions({
      model: versao,
      max_tokens: 25,
      messages: [  
        {role: 'assistant', content: `Meu nome é ${nome}`},  
        {role: 'assistant', content: prompt},
        {role: 'assistant', content: file},    
        { role: 'user', content: user }],
      functions: [
        {
          function: getInformations,
          parameters: { type: 'object', properties: {} },
        },
      ],
    })
    .on('message', (message) => console.log(message));

  const finalContent = await runner.finalContent();
  res.send(finalContent);
})

