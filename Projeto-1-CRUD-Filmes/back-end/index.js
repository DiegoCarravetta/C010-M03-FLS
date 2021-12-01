// Preciso importar o express para que seja possível ultilizar as suas funções na aplicação
const express = require("express");

// Depois de importar o express, preciso ativá-lo
const app = express();

// Preciso importar o JSON (Javascript Object Notation) para trabalhar com o express
app.use(express.json());

// Iniciando meus dados fixos manualmente (CRUD memória)
const filmes = [
    {
        nome: "Venom: Tempo de Carnificina",
        imagem: "https://br.web.img2.acsta.net/pictures/21/05/10/15/32/2425639.png",
        genero: "Ação",
        nota: "",
        assistido: false
    },

    {
        nome: "Shang-Chi e a Lenda dos Dez Anéis",
        imagem: "https://br.web.img3.acsta.net/pictures/21/08/05/20/13/2818037.jpg",
        genero: "Ação",
        nota: "",
        assistido: false
    },

    {
        nome: "Duna",
        imagem: "https://br.web.img3.acsta.net/c_310_420/pictures/21/09/29/20/10/5897145.jpg",
        genero: "Ação",
        nota: "",
        assistido: false
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
    res.send("Meus filmes favoritos");
});

// Crio a rota onde a regra de negócio retornar a lista de vagas
app.get('/filmes', (req, res) => {
    res.send(filmes);
})

// Crio uma rota que retorna para o cliente uma única vaga de acordo com o seu id, procurando na lista uma vaga que contenha o id igual ao que eu recebi via parametro
app.get('/filmes/:id', (req, res) => {
    const idParam = req.params.id; //acessar o id via a requisicao
    const filmeEncontrado = filmes.find(filme => filme.nome == idParam); // busca o item na lista de acordo com o seu id
    res.send(filmeEncontrado); // envia para o front-end a vaga encontrada
})

// Preciso definir a porta que o meu backend irá executar e inicializar o servidor com ela
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})