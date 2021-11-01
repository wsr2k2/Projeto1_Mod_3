const express = require("express");
const router = express.Router();

let jogos = [{
    titulo: "Cadillacs and Dinosaurs",
    plataforma: "Arcade, emulador",
    ano: "1993",
    estilo: "Ação / Aventura"
},
{
    titulo: "Need",
    ano: "2012",
    plataforma: "Android, Microsoft Windows, PlayStation 3, Xbox 360, PlayStation Vita, iOS, Wii U, Amazon Fire",
    estilo: "Corrida / Simulador"

}];

router.get("/", (req,res) => {
    res.status(200).json({message: "Jogos carregado, press Start!!!"});
});

// retorna a lista de jogos
router.get("/listar", (req,res) => {
    res.status(200).json(jogos);
})

//rota para buscar um jogo pelo ID
router.get("/listarid/:id", (req,res) => {
    const id = req.params.id -1;
    const jogo = jogos[id];
    //validação para confirmar se existe o jogo cadastrado
    if (!jogo) {
        res.status(404).send("Jogo não encontrado!");
        return;
    }
    res.status(200).json(jogo);
});

// rota para buscar um jogo pelo nome.
router.get("/listarnome/:nome", (req,res) => {
    const nome = req.params.nome;
    const jogo = jogos.find((item) => item.titulo === nome);
    if (!jogo) {
        res.status(404).send("Jogo não encontrado!");
        return;
      }
    res.status(200).json(jogo);
})

// rota para cadastrar um novo jogo.
router.post("/", (req,res) => {
    const jogo = req.body;
    // validação para não deixar campos em branco.
    if(!jogo.titulo){
        res.status(400).json({message:"Título do jogo está vazio"});
        return;
    }
    if(!jogo.ano){
        res.status(400).json({message:"Ano do jogo está vazio"});
        return;
    }
    if(!jogo.plataforma){
        res.status(400).json({message:"Plataforma do jogo está vazio"});
        return;
    }
    if(!jogo.estilo){
        res.status(400).json({message:"Estilo do jogo está vazio"});
        return;
    }
    jogos.push(jogo); 
    res.status(201).json({message:`Jogo: '${jogo.titulo}', cadastrado com sucesso!`});
});

// rota para atualizar um jogo, por ID, cadastrado.
router.put("/:id" , (req, res) => {
    const id = req.params.id -1;
    const jogo = jogos[id];
    
    //validação para confirmar se existe o jogo cadastrado
    if (!jogo) {
        res.status(404).send("Jogo não encontrado!");
        return;
    }else {
        const jogo = req.body;
        // validação para não deixar campos em branco.
        if(!jogo.titulo){
            res.status(400).json({message:"Título do jogo está vazio"});
            return;
        }
        if(!jogo.ano){
            res.status(400).json({message:"Ano do jogo está vazio"});
            return;
        }
        if(!jogo.plataforma){
            res.status(400).json({message:"Plataforma do jogo está vazio"});
            return;
        }
        if(!jogo.estilo){
            res.status(400).json({message:"Estilo do jogo está vazio"});
            return;
        }
        jogos[id] = jogo;        
    }    
    res.status(200).json(`Jogo: '${jogo.titulo}', alterado com sucesso!`);    
})

// deletar um jogo pelo ID
router.delete("/:id" , (req, res) => {
    const id = req.params.id -1;
    const jogo = jogos[id];
    //validação para confirmar se existe o jogo cadastrado
    if (!jogo) {
        res.status(404).send("Jogo não encontrado!");
        return;
    }else {
        delete jogos[id];
    }
    res.status(410).json(`Jogo: '${jogo.titulo}', excluído com sucesso!`)    
});

module.exports = router;