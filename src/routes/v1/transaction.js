const router = require('express').Router();
const {body, header, validationResult} = require('express-validator');
const { makeValidationErrorResponse, tokenSanitizer, invalidJWTTokenMessage } = require('../../utils');

const Balance = require('../../models/balance');
const Transaction = require('../../models/transaction');
const BalanceRepository = require('../../balance/repository');
const TransactionRepository = require('../../transaction/repository');
const Service = require('../../transaction/service');
const Handler = require('../../handler/transaction');

const balanceRepository = new BalanceRepository(Balance);
const transactionRepository = new TransactionRepository(Transaction);
const transactionService = new Service(transactionRepository, balanceRepository);
const transactionHandler = new Handler(transactionService);

router.post(
  '/',
  header('Authorization').customSanitizer(tokenSanitizer).isJWT().withMessage(invalidJWTTokenMessage),
  body('trx_id').isString().notEmpty().withMessage('Invalid transaction id'),
  body('amount')
    .notEmpty().isFloat({min: 0.00000002}).withMessage('Cannot be zero or precision is over the maximum.'),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return transactionHandler.v1CreateTransaction(req, res);
    }
    return makeValidationErrorResponse(res, errors);
  }
);

module.exports = router;
