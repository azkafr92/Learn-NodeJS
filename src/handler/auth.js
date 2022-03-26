const {makeInternalServerErrorResponse, makeTokenErrorResponse} = require('../utils');


class Handler {
  constructor(service) {
    this.service = service;
  }

  v1GetAllUsers = (req, res) => {
    this.service.verifyToken(req.headers.authorization)
      .then(([err, isVerified]) => {
        if (err) {
          return makeTokenErrorResponse(res, err);
        } else if (isVerified) {
          this.service.getAllUsers()
            .then(users => {
              res.json({ status: 200, message: 'OK', data: users });
              return;
            })
            .catch(err => {
              return makeInternalServerErrorResponse(res, err);
            });
        } else {
          return makeTokenErrorResponse(res, { message: 'User not verified or has been removed.' });
        }
      });
  };

  v1GetUserByEmail = (req, res) => {
    this.service.verifyToken(req.headers.authorization)
      .then(([err, isVerified]) => {
        if (err) {
          res
            .status(err.statusCode)
            .json({ status: err.statusCode, message: err.message });
          return;
        } else if (isVerified) {
          this.service.getUserByEmail(req.body.email)
            .then(user => {
              res.json({ status: 200, message: 'OK', data: user });
              return;
            })
            .catch(err => {
              res.status(err.statusCode).json({ status: err.statusCode, message: err.message, data: err.data });
              return;
            });
        } else {
          return makeTokenErrorResponse(res, {message: 'User not verified or has been removed.'});
        }
      });
  };

  v1CreateUser = (req, res) => {
    this.service.createUser(req.body.email, req.body.password)
      .then(user => res.json({ status: 200, message: 'OK', data: user }))
      .catch(err => {
        console.error(err);
        res
          .status(err.statusCode)
          .json({status: err.statusCode, message: err.message, data: err.data });
        return;
      });
  };

  v1CreateToken = (req, res) => {
    this.service.createToken(req.body.email, req.body.password)
      .then(token => res.json({ status: 200, message: 'OK', token }))
      .catch(err => {
        console.error(err);
        res.status(err.statusCode).json({ status: err.statusCode, message: err.message, data: err.data });
        return;
      });
  };
}

module.exports = Handler;
