const server = () => {
  const express = require('express');
  const app = express();

  app.use(require('morgan')('tiny'));
  app.use(require('body-parser').json());

  const v1 = express.Router();
  v1.use('/auth', require('./routes/v1/auth'));
  v1.use('/quote', require('./routes/v1/quote'));
  v1.use('/transaction', require('./routes/v1/transaction'));
  v1.use('/price', require('./routes/v1/price'));
  v1.use('/balance', require('./routes/v1/balance'));

  app.all('/', (req, res) => res.json({status: 200, message: 'OK'}));
  app.use('/api/v1', v1);
  app.all('/*', (req, res) => res.status(404).json({status: 404, message: 'Not Found'}));

  return app;
};

module.exports = server;
