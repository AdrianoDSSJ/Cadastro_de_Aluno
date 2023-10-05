const express = require('express');

const rotas = express();


const alunos = require('./controladores/alunos');

rotas.get('/', function (req, res) {
    res.send('menu principal.');
});

rotas.get('/alunos', alunos.listarAlunos);

rotas.get('/alunos/:id', alunos.obterUmAluno);

rotas.post('/alunos', alunos.addAluno);

rotas.delete('/alunos/:id', alunos.deletarUmAluno);





module.exports = rotas;