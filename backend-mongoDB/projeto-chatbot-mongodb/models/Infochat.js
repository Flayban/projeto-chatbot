const mongoose = require('mongoose')
//Determina os campos que devem ter no DB
const Infochat = mongoose.model('InfoChat',{
    nome: String,
    versao: String,
    prompt: String,  
    file: String,  
})

module.exports = Infochat