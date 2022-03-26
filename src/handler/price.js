const csv = require('csv-batch');
const fs = require('fs');
const {validationResult} = require('express-validator');
const {toCamelCase} = require('../utils');
const db = require('../config/config');
const Price = require('../models/price');
const MAX_BATCH_SIZE = 10000;

class Handler {
  constructor(service) {
    this.service = service;
  }

  v1GetLowHighPrice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
      return;
    }

    res.json({status: 200, message: 'OK'});
  };

  v1GetHistoricalPrice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
      return;
    }

    res.json({status: 200, message: 'OK'});
  };

  v1UploadPrice = async (req, res) => {
    const stream = fs.createReadStream(req.file.path);
    csv(stream, {
      batch: true,
      batchSize: MAX_BATCH_SIZE,
      headers: true,
      columns: [
        'id', 'name', 'ticker', 'coinId', 'code',
        'exchange', 'invalid', 'recordTime', 'usd', 'idr',
        'hnst', 'eth', 'btc', 'createdAt', 'updatedAt',
      ],
      batchExecution: batch => {
        this.service.batchInsertPriceHistories(batch);
      },
    }).then(() => {
      res.json({ status: 200, message: 'OK'});
    }).catch((err) => {
      res.status(500); console.error(err);
    });
  };
}

module.exports = Handler;
