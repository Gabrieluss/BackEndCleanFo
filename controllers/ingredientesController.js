const express = require('express')
const router = express.Router();
const dbConnection = require('../models/dbConnection');

//GET
router.get('/', (req,res) => {
    dbConnection.query('SELECT * FROM tbingredientes', (err,result) => {
        if(err) throw err;
        res.json(result);
    })
})

//Get pelo cod
router.get('/:codIngrediente', (req,res) => {
    const codIngrediente = req.params.codIngrediente;
    const query = `SELECT * FROM tbingredientes WHERE codIngrediente = ${codIngrediente}`
    dbConnection.query(query,(err,result) => {
        if(err) throw err;
        res.json(result)
    }) 
})

//POST
router.post('/', (req,res) => {
    const {nomeIngrediente,rendeMedidas,codReceita} = req.body;
    const query = 'INSERT INTO tbingredientes(nomeIngrediente,rendeMedidas,codReceita) values (?,?,?)';

    dbConnection.query(query, [nomeIngrediente,rendeMedidas,codReceita], (err,result) => {
        if(err){
            res.status(500).json({
                mensagem: 'Erro ao adicionar ingrediente'
            })
        }else{
            res.status(201).json({
            mensagem: 'Ingrediente adicionado com sucesso!',
            codIngrediente: result.insertId,
            body: req.body
            })
        }
    })
})

//Delete pelo cod como referência
router.delete('/:codIngrediente', (req,res) => {
    const {codIngrediente} = req.params;
    const query = 'DELETE FROM tbingredientes WHERE codIngrediente = ?';

    dbConnection.query(query, {codIngrediente}, (err,result) => {
        if(err){
            res.status(500).json({
                mensagem: 'Erro ao deletar ingrediente'
            })
        }else{
            res.status(201).json({
                mensagem: 'Ingrediente deletado com sucesso!'
            })
        }
    })
})

//PUT
router.put('/:codIngrediente', (req,res) => {
    const {codIngrediente} = req.params;
    const {nomeIngrediente,rendeMedidas} = req.body;
    const query = 'UPDATE tbIngrediente SET nomeIngrediente = ?, rendeMedidas = ? WHERE codIngrediente = ?';

    dbConnection.query(query, [nomeIngrediente,rendeMedidas,codIngrediente], (err,result) =>{
        if(err) throw err;
        res.status(201).json({
            mensagem: 'Ingrediente alterado com sucesso!',
                envio:{
                    nomeIngrediente: nomeIngrediente,
                    rendeMedidas: rendeMedidas
                }
        })
    })
})
module.exports = router;