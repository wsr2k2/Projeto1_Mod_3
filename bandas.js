const express = require("express");
const router = express.Router();

let bandas = [{
    nome: "Pearl Jam",
    estilo: "Grunge",
    formacaoAtual: "Eddie Vedder; Stone Gossard; Jeff Ament; Mike McCready; Matt Cameron; Josh Klinghoffer",
    melhorMusica: "Alive"
},
{
    nome: "Green Day",
    estilo: "Punk",
    formacaoAtual: "Billie Joe Armstrong; Mike Dirnt; Tré Cool",
    melhorMusica: "Basket Case"
}];

router.get("/", (req,res) => {
    res.status(200).json({message: "Bandas carregada, aumente o som!!!"});
});

// retorna a lista de bandas
router.get("/listar", (req,res) => {
    res.status(200).json(bandas);
})

//rota para buscar um banda pelo ID
router.get("/listarid/:id", (req,res) => {
    const id = req.params.id -1;
    const banda = bandas[id];
    //validação para confirmar se existe a banda cadastrado
    if (!banda) {
        res.status(404).send("Banda não encontrado!");
        return;
    }
    res.status(200).json(banda);
});

// rota para buscar uma banda pelo nome.
router.get("/listarnome/:nome", (req,res) => {
    const nomeBanda  = req.params.nome;
    const banda = bandas.find((item) => item.nome === nomeBanda);
    if (!banda) {
        res.status(404).send("Banda não encontrada!");
        return;
      }
    res.status(200).json(banda);
})

// rota para cadastrar uma nova banda.
router.post("/", (req,res) => {
    const banda = req.body;
    // validação para não deixar campos em branco.
    if(!banda.nome){
        res.status(400).json({message:"Preencha o nome da banda"});
        return;
    }
    if(!banda.estilo){
        res.status(400).json({message:"Preencha o estilo da banda"});
        return;
    }
    if(!banda.formacaoAtual){
        res.status(400).json({message:"Preencha o ano doa formação atual da banda"});
        return;
    }
    if(!banda.melhorMusica){
        res.status(400).json({message:"Preencha a melhor música da banda"});
        return;
    }
    bandas.push(banda); 
    res.status(201).json({message:`Banda: '${banda.nome}', cadastrada com sucesso!`});
});

// rota para atualizar uma banda, por ID, cadastrada.
router.put("/:id" , (req, res) => {
    const id = req.params.id -1;
    const banda = bandas[id];
    
    //validação para confirmar se existe o banda cadastrado
    if (!banda) {
        res.status(404).send("Banda não encontrada!");
        return;
    }else {
        const banda = req.body;
        // validação para não deixar campos em branco.
        if(!banda.nome){
            res.status(400).json({message:"Preencha o nome da banda"});
            return;
        }
        if(!banda.estilo){
            res.status(400).json({message:"Preencha o estilo da banda"});
            return;
        }
        if(!banda.formacaoAtual){
            res.status(400).json({message:"Preencha o ano doa formação atual da banda"});
            return;
        }
        if(!banda.melhorMusica){
            res.status(400).json({message:"Preencha a melhor música da banda"});
            return;
        }
        bandas[id] = banda;        
    }    
    res.status(200).json(`Banda: '${banda.nome}', alterada com sucesso!`);    
})

// deletar uma banda pelo ID
router.delete("/:id" , (req, res) => {
    const id = req.params.id -1;
    const banda = bandas[id];
    //validação para confirmar se existe o banda cadastrado
    if (!banda) {
        res.status(404).send("Banda não encontrada!");
        return;
    }else {
        delete bandas[id];
    }
    res.status(410).json(`Banda: '${banda.nome}', excluída com sucesso!`)    
});

module.exports = router;