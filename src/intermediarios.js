const express = require('express');

const intermediario = express();

const alunos = require('./controladores/alunos');

intermediario.use(function (req, resp, next) {
    const { senha } = req.query
    if (senha === 'cubos123') {
        return next();
    } else {
        return resp.status(401).json({ mensagem: "Senha errada ou não informada." })
    }
});




module.exports = intermediario;