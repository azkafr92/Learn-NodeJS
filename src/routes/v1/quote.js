const router = require('express').Router();
const {v1GetQuote} = require('../../handler/quote');

router.get('/', v1GetQuote);

module.exports = router;
