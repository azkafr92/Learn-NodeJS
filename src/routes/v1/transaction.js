const router = require('express').Router();
const {body} = require('express-validator');
const {v1CreateTransaction} = require('../../handler/transaction');

router.post(
  '/',
  body('trx_id').notEmpty().bail().isInt().withMessage('Invalid transaction id'),
  body('amount')
    .notEmpty().bail().isFloat({min: 0.00000001}).withMessage('Cannot be zero or precision is over the maximum.'),
  body('user_id').notEmpty().bail().isInt(),
  v1CreateTransaction,
);

module.exports = router;
