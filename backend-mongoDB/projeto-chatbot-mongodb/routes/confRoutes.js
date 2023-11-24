const router = require('express').Router()
const Infochat = require('../models/Infochat')

//Criar nova configuração
router.post('/poste', async(req, res) => {
    const{nome, versao, prompt, file} = req.body

    if(!nome){
        res.status(422).json({error: 'O nome é obrigatorio'})
        return
    }

    if(!versao){
        res.status(422).json({error: 'A seleção da versão é obrigatoria'})
        return
    }

    if(!prompt){
        res.status(422).json({error: 'O prompt é obrigatorio'})
        return
    }

    if(!file){
        res.status(422).json({error: 'O prompt é obrigatorio'})
        return
    }

    const config = {
        nome,
        versao,
        prompt,
        file
    }  

    //create
    try {
        await Infochat.create(config)
        res.status(201).json({message: 'Comfiguração salva com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Recuperar configurações no geral
router.get('/get', async (req,res)=>{
    try {
        const config = await Infochat.find()
        res.status(200).json(config)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//Recuperar configuração a partir de um ID especifico
router.get('/get/:id', async (req,res)=>{
    const id = req.params.id

    try {        
        const config = await Infochat.findOne({_id: id})
        if(!config){
            res.status(422).json({message: "A configuração não foi encontrado" })
            return
        }
        res.status(200).json(config)

    } catch (error) {
        res.status(500).json({error:error})
    }
})

//Atualizar configuração a partir de um ID
router.patch('/patch/:id', async (req, res)=>{
    const id = req.params.id
    const{nome, versao, prompt, file} = req.body

    const config ={
        nome,
        versao,
        prompt,
        file
    }
    try {
        const updateConfig = await Infochat.updateOne({_id:id}, config)
        if(updateConfig.matchedCount === 0){
            res.status(422).json({message: "A configuração não foi encontrado" })
            return
        }
        res.status(200).json(config)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//Deletar Configuração
router.delete('delete/:id', async(req, res) =>{
    const id = req.params.id
    const config = await Infochat.findOne({_id: id})
    if(!config){
        res.status(422).json({message: "A configuração não foi encontrado" })
        return
    }

    try {        
        await Infochat.deleteOne({_id: id})
        res.status(200).json({message: 'Comfiguração removida com sucesso'})
    } catch (error) {
        res.status(500).json({error:error})
    }

})

module.exports = router