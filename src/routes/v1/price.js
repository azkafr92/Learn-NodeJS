const {query} = require('express-validator');
const {PriceUploadError} = require('../../price/error');

const Price = require('../../models/price');
const Repository = require('../../price/repository');
const Service = require('../../price/service');
const Handler = require('../../handler/price');

const upload = require('multer')({
  dest: 'tmp/upload/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true);
      return;
    } else {
      cb(new PriceUploadError(file), false);
      return;
    }
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
}).single('file');
const router = require('express').Router();

const priceRepository = new Repository(Price);
const priceService = new Service(priceRepository);
const priceHandler = new Handler(priceService);

const MAX_FILE_SIZE = 1000000000; // 1 GB

router.post(
  '/upload',
  (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(err.statusCode || 400).json({ status: err.statusCode || 400, message: err.message });
        return;
      } else {
        return priceHandler.v1UploadPrice(req, res);
      }
    });
  }
);

router.get(
  '/low-high',
  query('week').optional().isInt({min: 1, max: 52}),
  query('year').optional().isInt({min: 0}),
  query('ticker').optional().isAlpha(),
  query('currency').optional().isAlpha(),
  priceHandler.v1GetLowHighPrice,
);

const TIMEFRAME = [
  '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M',
];
router.get(
  '/history',
  query('timeframe').isIn(TIMEFRAME),
  query('ticker').optional().isAlpha(),
  query('currency').optional().isAlpha(),
  priceHandler.v1GetHistoricalPrice,
);

module.exports = router;
