const { header, validationResult } = require('express-validator');
const { makeValidationErrorResponse, tokenSanitizer, invalidJWTTokenMessage } = require('../../utils');
const router = require('express').Router();

const Balance = require('../../models/balance');
const Repository = require('../../balance/repository');
const Service = require('../../balance/service');
const Handler = require('../../handler/balance');

const balanceRepository = new Repository(Balance);
const balanceService = new Service(balanceRepository);
const balanceHandler = new Handler(balanceService);

router.get(
  '/',
  header('Authorization').customSanitizer(tokenSanitizer).isJWT().withMessage(invalidJWTTokenMessage),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return balanceHandler.v1GetUserBalance(req, res);
    }
    return makeValidationErrorResponse(res, errors);
  }
);

module.exports = router;