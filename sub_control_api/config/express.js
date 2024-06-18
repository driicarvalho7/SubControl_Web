// config/express.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const connectDB = require('./db');
const cookieParser = require('cookie-parser');

module.exports = () => {
  const app = express();

  // Conectar ao MongoDB
  connectDB();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());
  app.use(cookieParser());

  // ROTAS
  const users = require('../api/routers/users');
  const register = require('../api/routers/register');
  const login = require('../api/routers/login');

  app.use('/api/users', users);
  app.use('/api/register', register);
  app.use('/api/login', login);

  return app;
};
