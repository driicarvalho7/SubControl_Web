const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const connectDB = require('./db');

module.exports = () => {
  const app = express();

  // Conectar ao MongoDB
  connectDB();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  // ROTAS
  const users = require('../api/routers/users');
  users(app);

  return app;
};
