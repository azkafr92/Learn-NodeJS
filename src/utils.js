const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const saltRounds = 10;
const invalidJWTTokenMessage = 'Invalid JWT Token';
const jwt = require('jsonwebtoken');

const generateUid = length => {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '1234567890';
  const allChars = lowerCase + upperCase + numbers;
  const allCharsLength = allChars.length;

  let uid = '';
  for (let i = 0; i < length; i++) {
    uid += allChars.charAt(Math.floor(Math.random() * allCharsLength));
  }

  return uid;
};

const hashPassword = plainPassword => bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(saltRounds));

const makeTokenErrorResponse = (res, err) => {
  res.status(400).json({ status: 400, message: err.message });
  return;
};

const makeValidationErrorResponse = (res, err) => {
  res.status(400).json({ status: 400, message: 'Bad request', errors: err.array() });
  return;
};

const makeInternalServerErrorResponse = (res, err) => {
  console.error(err);
  res.status(500).json({ status: 500, message: 'Internal server error' });
  return;
};

const tokenSanitizer = token => {
  if (token.startsWith('Bearer')) {
    token = token.split(' ').slice(-1)[0];
  }
  return token;
};

const normalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
});

const decodeToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    let errorMessage = null;
    let user = null;
    if (err) {
      errorMessage = { message: err.message, statusCode: 400 };
    } else {
      user = decoded;
    }
    return [errorMessage, user];
  });
};

const sleep = (ms) => {
  const time = Date.now();
  let currentTime;
  do {
    currentTime = Date.now();
  } while ( currentTime - time < ms);
};

const trimNumber = (x) => {
  let e;
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split('e-')[1]);
    if (e >= 6) {
      x = 0;
    } else if (e) {
      x *= Math.pow(10, e-1);
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    } else {
      x = Number(x.toString().substring(0, 8));
    }
  } else {
    e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e+1)).join('0');
    } else {
      x = x.toString();
      decimalSeparatorIndex = x.indexOf('.');
      if (decimalSeparatorIndex > -1) {
        [y, z] = x.split('.');
        z = z.substring(0, 6);
        x = Number(y + '.' + z);
      }
    }
  }
  return x;
};

module.exports = {
  generateUid,
  hashPassword,
  makeValidationErrorResponse,
  makeInternalServerErrorResponse,
  tokenSanitizer,
  makeTokenErrorResponse,
  normalRateLimit,
  invalidJWTTokenMessage,
  decodeToken,
  sleep,
  trimNumber,
};
