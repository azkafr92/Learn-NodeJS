const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const saltRounds = 10;

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

module.exports = {
  generateUid,
  hashPassword,
  makeValidationErrorResponse,
  makeInternalServerErrorResponse,
  tokenSanitizer,
  makeTokenErrorResponse,
  normalRateLimit,
};
