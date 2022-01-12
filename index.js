const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({message: "Bem vindos a Api Games, Movies e Bandas"})
});

const jogosRouter = require("./routers/jogos.routes");
app.use("/jogos", jogosRouter);

const filmesRouter = require("./routers/filmes.routes");
app.use("/filmes", filmesRouter);

const bandasRouter = require("./routers/bandas.routes");
app.use("/bandas", bandasRouter);

app.listen(port, () => {
  console.info(`App rodando em: http://localhost:${port}`);
});