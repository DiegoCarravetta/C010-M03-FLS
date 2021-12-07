// importo o service para poder ter acesso as funcoes que cuidam dos dados.
const vagasService = require('../services/vagas.service');

// vai retornar uma lista de vagas pré cadastradas para o front-end
const getVagas = (req, res) => {
    const vagas = vagasService.getVagasService();
    res.send(vagas);
}

// vai retornar uma unica vaga de acordo com o seu id
const getVagasById = (req, res) => {
    // REQ = o que vem do front pro back
    // RES = o que o backend retornar pro front
    const id = req.params.id;
    const vaga = vagasService.getVagasByIdService(id);
    res.send(vaga)
}

// vai cadastrar uma nova vaga de acordo com o obj vindo do front
const postVaga = (req, res) => {
    // quero validar os dados de entrada no backend
    if(!req.body || !req.body.empresa || !req.body.oportunidade || !req.body.salario) { 
        res.status(400).send({message: 'Vaga invalida, Por favor preencha pelo menos o nome da empresa e salario e oportunidade'})
        return
    }

    // pegamos o objeto da requisicao para ser cadastro
    const vaga = req.body;
    console.log(req.body);
    // estou enviando a vaga que recebi via corpo da requisicao para o servico adicionar na lista
    const newVaga = vagasService.addVaga(vaga);

    if(!newVaga.id) {
        res.status(500).send({message: "Ocorreu um erro ao salvar a vaga, tente novamente"})
    }

    res.send({message: `Vaga ${ newVaga.oportunidade } na empresa ${ newVaga.empresa } cadastrada com sucesso`})
}

// vai receber um obj (body) e um id(param) para poder atualizar a vaga com o objeto de acordo com o seu id
const putVaga = (req, res) => {
    if(!req.body || !req.body.empresa || !req.body.oportunidade || !req.body.salario) {
        res.status(400).send({message: 'Nao foi possivel Editar por favor preencha todos os campos.'})
    }


    // pego o parametro id recebido via requisicao
    const idParam = req.params.id
    // pego o objeto recebido via requisicao
    const vagaEdit = req.body
    const edicao = vagasService.putVaga(idParam, vagaEdit);
    if(edicao) {
        res.send({message: `A vaga foi editada com sucesso!`})
    } else {
        res.status(404).send({message: `Nao encontramos vaga com esse id para editar`})
    }
}

// excluir um item da lista e devolver a msg de exclusao para o front-end
const deleteVaga = (req, res) => {
    const id = req.params.id;
    const vagaExcluida = vagasService.deleteVaga(req.params.id);
    if(!vagaExcluida) {
        res.status(404).send({message: 'Nao foi possivel excluir, o id nao foi encontrado'})
    }
    res.send({message: `A vaga ${vagaExcluida.oportunidade} da empresa ${vagaExcluida.empresa} foi excluida com sucesso`});
}




// exportando as funcoes para serem usadas nas rotas
module.exports = {
    getVagas,
    getVagasById,
    postVaga,
    putVaga,
    deleteVaga
}