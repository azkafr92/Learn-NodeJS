const {makeInternalServerErrorResponse, makeTokenErrorResponse} = require('../utils');

class Handler {
  constructor(service) {
    this.service = service;
  }

  v1GetUserBalance = (req, res) => {
    this.service.decodeToken(req.headers.authorization)
      .then(([err, user]) => {
        if (err) {
          return makeTokenErrorResponse(res, err);
        } else if (user) {
          this.service.getUserBalance(user)
            .then(balance => {
              res.json({ status: 200, message: 'OK', data: balance });
              return;
            })
            .catch(err => {
              return makeInternalServerErrorResponse(res, err);
            });
        }
      });
  };
}

module.exports = Handler;