const {makeInternalServerErrorResponse, makeTokenErrorResponse} = require('../utils');

class Handler {
  constructor(service) {
    this.service = service;
  }

  v1CreateTransaction = (req, res) => {
    this.service.decodeToken(req.headers.authorization)
      .then(([err, user]) => {
        if (err) {
          return makeTokenErrorResponse(res, err);
        } else if (user) {
          this.service.saveTransaction(req.body.trx_id, user.id, req.body.amount)
            .then(([transaction, updatedUserBalance]) => {
              res.json({status: 200, message: 'OK', transaction, balance: updatedUserBalance});
            })
            .catch((err) => {
              console.error(err);
              res.status(err.statusCode).json({status: err.statusCode, message: err.message, data: err.data});
              return;
            });
        }
      });
  };
}

module.exports = Handler;