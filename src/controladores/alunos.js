const { json } = require('express');
let { alunos, idServidor } = require('../bancodedados');


function listarAlunos(req, resp) {
    return resp.status(200).json(alunos);
}

function obterUmAluno(req, resp) {
    const { id } = req.params;
    const aluno = alunos.find(function (aluno) {
        return aluno.id === Number(id);
    })
    if (aluno) {
        return resp.status(200).json(aluno);
    } else if (id > 0) {
        return resp.status(404).json({ mensagem: 'O aluno não foi encontrado.' });
    } else {
        return resp.status(400).json({ mensagem: 'O ID deve ser um número válido.' })
    }

}
function addAluno(req, resp) {
    const { nome, sobrenome, idade, curso } = req.body;
    if (!nome || nome.trim() === "") {
        return resp.status(400).json({ mensagem: 'Nome ausente.' });
    }
    if (!sobrenome || sobrenome.trim() === "") {
        return resp.status(400).json({ mensagem: 'Sobrenome ausente.' });
    }
    if (!curso || curso.trim() === "") {
        return resp.status(400).json({ mensagem: 'Curso ausente.' });
    }
    if (!idade) {
        return resp.status(400).json({ mensagem: 'Idade ausente.' });
    } else if (idade < 18) {
        return resp.status(400).json({ mensagem: 'Aluno menor de Idade.' });
    }
    const novoAluno = {
        id: ++idServidor,
        nome,
        sobrenome,
        idade,
        curso
    }
    alunos.push(novoAluno);
    return resp.status(201).send();

}

function deletarUmAluno(req, resp) {
    const { id } = req.params;

    if (!Number(id) || id < 1) {
        return resp.status(400).json({ mensagem: "O ID deve ser um número válido" });
    }
    const aluno = alunos.find(function (aluno) {
        return aluno.id === Number(id);
    })

    if (!aluno) {
        return resp.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    alunos.splice(alunos.indexOf(aluno), 1);

    return resp.status(200).json(aluno);

}


module.exports = {
    listarAlunos,
    obterUmAluno,
    addAluno,
    deletarUmAluno
}