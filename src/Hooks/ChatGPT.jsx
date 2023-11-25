import {Configuration, OpenAIApi} from "openai"

//express
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3333)

//cors
const cors = require('cors')
app.use(cors())
app.options('*',  cors())
//openAI
const config = new Configuration({
  apiKey: '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',
})

const openia = new OpenAIApi(config)

app.post('/api/call', async (req, res) =>{
  const runPrompt = async () => {
    const response = await openia.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: req.body.prompt,
      max_tokens: 1024,
      temperature: 0.7,
    })
    return response.data
  }
  const responseFromAPI = await runPrompt()
  res.send(responseFromAPI.choices[0].text)
})