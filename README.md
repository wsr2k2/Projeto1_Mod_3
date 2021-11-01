# Projeto listas - Módulo 3 - Backend

Instruções para rodar o projeto.

Primeiro iniciar com:
 npm init

Instalar o Node Express:
npm i express

Alterar no packge.json os scripts:
"scripts": {
    "start": "node index",
    "dev": "nodemon index"
  },

utilizado o Nodemon para atualizar o projeto em tempo real, se desejar instalar:
npm install -g nodemon

Para incializar a aplicação:
no terminal digite: node index

Caso tenha instalado o Nodemon, digitar no terminal o seguinte comando:
npm run dev

Acessar o projeto pela porta 3000

Após a inicialização do projeto, utilizar o Thunder Client para realizar o CRUD nas listas.

Inserido collections para auxiliar e facilitar a operação da API.

Projeto com 3 listas sendo:
Jogos;
Filmes;
Bandas.

Em todas as listas foram adicionados rotas de listagem geral e individual (id ou nome), cadastro, alteração e deleção (CRUD);

Foram adicionados validações dos dados inseridos e de campos em branco, sendo obrigatório o preenchimentos dos mesmos.

Link para acessar o código no guithub:
