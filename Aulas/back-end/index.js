// Preciso importar o express para que seja possível ultilizar as suas funções na aplicação
const express = require("express");

// Depois de importar o express, preciso ativá-lo
const app = express();

// Preciso importar o JSON (Javascript Object Notation) para trabalhar com o express
app.use(express.json());

// Iniciando meus dados fixos manualmente (CRUD memória)
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

//CORS - Protege a sua aplicação, permitindo a troca de recursos entre origens diferentes
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
})

// Preciso criar a rota principal com req e res, pois toda rota envia e recebe informação
//REQ (REQUEST/REQUISICAO) - VEM DO CLIENTE
//RES (RESPONSE/RESPOSTA) - VOLTA PARA O CLIENTE
app.get('/', (req, res) => {
    res.send('Olá Blumers!');
});

// Crio a rota onde a regra de negócio retornar a lista de vagas
app.get('/vagas', (req, res) => {
    res.send(blueVagas);
})

// Crio uma rota que retorna para o cliente uma única vaga de acordo com o seu id, procurando na lista uma vaga que contenha o id igual ao que eu recebi via parametro
app.get('/vagas/:id', (req, res) => {
    const idParam = req.params.id; //acessar o id via a requisicao
    const vagaEcontrada = blueVagas.find(vaga => vaga.id == idParam); // busca o item na lista de acordo com o seu id
    res.send(vagaEcontrada); // envia para o front-end a vaga encontrada
})

// Preciso definir a porta que o meu backend irá executar e inicializar o servidor com ela
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})