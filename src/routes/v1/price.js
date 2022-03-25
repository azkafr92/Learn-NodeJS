const router = require('express').Router();
const {
  v1GetLowHighPrice,
  v1GetHistoricalPrice,
  v1UploadPrice,
} = require('../../handler/price');
const {query} = require('express-validator');
const upload = require('multer')({dest: 'tmp/upload/'});

router.post(
  '/upload',
  upload.single('file'),
  v1UploadPrice,
);

router.get(
  '/low-high',
  query('week').optional().isInt({min: 1, max: 52}),
  query('year').optional().isInt({min: 0}),
  query('ticker').optional().isAlpha(),
  query('currency').optional().isAlpha(),
  v1GetLowHighPrice,
);

const TIMEFRAME = [
  '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M',
];
router.get(
  '/history',
  query('timeframe').isIn(TIMEFRAME),
  query('ticker').optional().isAlpha(),
  query('currency').optional().isAlpha(),
  v1GetHistoricalPrice,
);

module.exports = router;
