const { normalRateLimit } = require('../../utils');
const router = require('express').Router();

const Service = require('../../quote/service');
const quoteService = new Service();

const Handler = require('../../handler/quote');
const quoteHandler = new Handler(quoteService);


router.get('/', normalRateLimit, quoteHandler.v1GetQuote);

module.exports = router;
