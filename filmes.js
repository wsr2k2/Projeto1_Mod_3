const express = require("express");
const router = express.Router();

let filmes = [{
    titulo: "Invocação do Mal",
    genero: "Terror",
    ano: "2013",
    sinopse: "Harrisville, Rhode Island, Estados Unidos, 1968. Os investigadores paranormais Ed e Lorraine Warren trabalham para ajudar uma família aterrorizada por uma presença sombria em sua fazenda. Forçados a confrontar uma entidade poderosa, os Warrens se vêem presos no caso mais aterrorizante de suas vidas. Baseado numa história real."
},
{
    titulo: "Um Sonho de Liberdade",
    genero: "Drama",
    ano: "1994",
    sinopse: "Em 1946, Andy Dufresne, um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela. Ele é mandado para uma prisão que é o pesadelo de qualquer detento, a Penitenciária Estadual de Shawshank, no Maine. Lá ele irá cumprir a pena perpétua. Andy logo será apresentado a Warden Norton, o corrupto e cruel agente penitenciário, que usa a Bíblia como arma de controle e ao Capitão Byron Hadley que trata os internos como animais. Andy faz amizade com Ellis Boyd Redding, um prisioneiro que cumpre pena há 20 anos e controla o mercado negro da instituição."
}];

router.get("/", (req,res) => {
    res.status(200).json({message: "Filmes rodando, pegue sua pipoca e bom filme!!!"});
});

// retorna a lista de filmes
router.get("/listar", (req,res) => {
    res.status(200).json(filmes);
})

//rota para buscar um filme pelo ID
router.get("/listarid/:id", (req,res) => {
    const id = req.params.id -1;
    const filme = filmes[id];
    //validação para confirmar se existe o filme cadastrado
    if (!filme) {
        res.status(404).send("Filme não encontrado!");
        return;
    }
    res.status(200).json(filme);
});

// rota para buscar um filme pelo nome.
router.get("/listarnome/:nome", (req,res) => {
    const nome = req.params.nome;
    const filme = filmes.find((item) => item.titulo === nome);
    if (!filme) {
        res.status(404).send("Filme não encontrado!");
        return;
      }
    res.status(200).json(filme);
})

// rota para cadastrar um novo filme.
router.post("/", (req,res) => {
    const filme = req.body;
    // validação para não deixar campos em branco.
    if(!filme.titulo){
        res.status(400).json({message:"Preencha o título do filme"});
        return;
    }
    if(!filme.genero){
        res.status(400).json({message:"Preencha o genero do filme"});
        return;
    }
    if(!filme.ano){
        res.status(400).json({message:"Preencha o ano do filme"});
        return;
    }
    if(!filme.sinopse){
        res.status(400).json({message:"Preencha o sinopse do filme"});
        return;
    }
    filmes.push(filme); 
    res.status(201).json({message:`Filme: '${filme.titulo}', cadastrado com sucesso!`});
});

// rota para atualizar um filme, por ID, cadastrado.
router.put("/:id" , (req, res) => {
    const id = req.params.id -1;
    const filme = filmes[id];
    
    //validação para confirmar se existe o filme cadastrado
    if (!filme) {
        res.status(404).send("Filme não encontrado!");
        return;
    }else {
        const filme = req.body;
        // validação para não deixar campos em branco.
        if(!filme.titulo){
            res.status(400).json({message:"Preencha o título do filme"});
            return;
        }
        if(!filme.genero){
            res.status(400).json({message:"Preencha o genero do filme"});
            return;
        }
        if(!filme.ano){
            res.status(400).json({message:"Preencha o ano do filme"});
            return;
        }
        if(!filme.sinopse){
            res.status(400).json({message:"Preencha a sinopse do filme"});
            return;
        }
        filmes[id] = filme;        
    }    
    res.status(200).json(`Filme: '${filme.titulo}', alterado com sucesso!`);    
});

// deletar um filme pelo ID
router.delete("/:id" , (req, res) => {
    const id = req.params.id -1;
    const filme = filmes[id];
    //validação para confirmar se existe o filme cadastrado
    if (!filme) {
        res.status(404).send("Filme não encontrado!");
        return;
    }else {
        delete filmes[id];
    }
    res.status(200).json(`Filme: '${filme.titulo}', excluído com sucesso!`)    
});

module.exports = router;