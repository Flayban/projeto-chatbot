
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

const {Configuration, OpenAIApi} = require('openai')

const config = new Configuration({
  apiKey: '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',
})

const openia = new OpenAIApi(config)

app.post('/api/call', async (req, res) =>{
  const runPrompt = async () => {
    const response = await openia.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.prompt,
      max_tokens: 50,
      temperature: 0.7,
    })
    return response.data
  }
  const responseFromAPI = await runPrompt()
  res.send(responseFromAPI.choices[0].text)
})