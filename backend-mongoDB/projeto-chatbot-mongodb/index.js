//dotenv
require('dotenv').config()

//Configuração inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//cors
const cors = require('cors')
app.use(cors())
app.options('*',  cors())

//Ler JSON
app.use(express.json())

// rotas da API
const configRoutes = require('./routes/confRoutes')
app.use('/config', configRoutes)

//Conexão com o MongoDB
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cb.irz7k2i.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        console.log("Conectado ao MongoDB")
        app.listen(3030)
    })
    .catch((err) => console.log(err))
