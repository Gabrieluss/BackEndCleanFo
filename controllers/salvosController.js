const express = require('express')
const router = express.Router();
const dbConnection = require('../models/dbConnection');

//GET 
router.get('/', (req,res) => {
    dbConnection.query('SELECT * FROM tbsalvos', (err,result) => {
        if(err) throw err;
        res.json(result);
    })
})

//GET pelo cod
router.get('/:codSalvo', (req,res) => {
    const codSalvo = req.params.codSalvo;
    const query = `SELECT * FROM tbsalvos WHERE codSalvo = ${codSalvo} `;

    dbConnection.query(query, (err,result) => {
        if(err) throw err;
        res.json(result)
    })
})

//post
router.post('/', (req,res) => {
    const {nomeReceita,codReceita} = req.body;
    const query = 'INSERT INTO tbsalvos(nomeReceita,codReceita) VALUES (?,?) ';

    dbConnection.query(query, [nomeReceita,codReceita], (err,result) => {
        if(err){
            res.status(500).json({
                mensagem: 'Erro ao adicionar salvo'
            })
        }else{
            res.status(201).json({
                mensagem: 'Receita salva com sucesso!',
                codSalvo: result.insertId,
                body: req.body
            })
        }
    })
})

//DELETE com cod COMO REFERÊNCIA
router.delete('/:codSalvo', (req,res) => {
    const {codSalvo} = req.params;
    const query = 'DELETE FROM tbsalvos WHERE codSalvo = ?';

    dbConnection.query(query, {codSalvo}, (err,result) => {
        if(err){
            res.status(500).json({
                mensagem: 'Erro ao deletar salvo'
            })
        }else{
            res.status(201).json({
                mensagem: 'Receita salva deletada com sucesso!'
            })
        }
    })
})


//PUT
router.put('/:codSalvo', (req,res) => {
    const {codSalvo} = req.params;
    const {nomeReceita} = req.body;
    const query = 'UPDATE tbsalvos set nomeReceita = ? WHERE codSalvo = ?';

    dbConnection.query(query, [nomeReceita,codSalvo], (err,result) => {
        if(err) throw err;
        res.status(201).json({
            mensagem: 'Receita salva alterada com sucesso!',
            envio:{
                nomeReceita: nomeReceita
            }
        })
    })
})
module.exports = router;