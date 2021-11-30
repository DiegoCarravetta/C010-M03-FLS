// SERVER (API)
// importar o express para que seja possivel ultilizar as suas funcoes na nossa aplicacao
const express = require('express');

// inicilizar o express no nosso arquivo javascript para que ele possa assumir as funcoes do servidor
const app = express();

const blueVagas = [
    {
        id: 1,
        empresa: "Blue",
        salario: 3000,
        oportunidade: "Front-End Jr",
        tipo: "estágio"
    },
    {
        id: 2,
        empresa: "Google",
        salario: 10000,
        oportunidade: "Front-End Jr",
        tipo: "CLT"
    },
    {
        id: 3,
        empresa: "Facebook",
        salario: 20000,
        oportunidade: "Full Stack Sr",
        tipo: "PJ"
    },
    {
        id: 4,
        empresa: "Amazon",
        salario: 15000,
        oportunidade: "Full Stack Pl",
        tipo: "CLT"
    }
]


//CORS - permite a troca de recursos entre origens diferentes
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
})

// JSON - Javascript Object Notation
// falo pro express trabalhar com middleware de json para trabalharmos com o formato JSON.
app.use(express.json());

// API - Forma de comunicacao entre sistemas que contem enderecos (EndPoints)
// REST - GET/POST/PUT/DELETE
// criar um endpoint para retonar uma msg para o cliente
app.get('/', (req, res) => {
    //REQ (REQUEST/REQUISICAO) - VEM DO CLIENTE
    //RES (RESPONSE/RESPOSTA) - VOLTA PARA O CLIENTE
    res.send('Olá Blumers!');
})

// Endpoint [GET] /vagas - Retornar a lista de vagas
app.get('/vagas', (req, res) => {
    res.send(blueVagas);
})

// Endpoint [GET] /vagas/{id} - retornar para o cliente uma unica vaga de acordo com o seu id
app.get('/vagas/:id', (req, res) => {
    //acessar o id via a requisicao
    const idParam = req.params.id;
    // buscar um item na lista de acordo com o seu id
    // procuro na lista uma vaga que contenha o id igual ao que eu recebi via parametro
    const vagaEcontrada = blueVagas.find(vaga => vaga.id == idParam);

    // envio para o front-end a vaga que encontrei
    res.send(vagaEcontrada);
})


// Definir a porta que o meu backend irá executar
const port = 3000;
// inicializa o servidor na seguite porta
app.listen(port, () => {
    console.log(`App Rodando na porta ${port}`);
})