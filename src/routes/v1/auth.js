const { body, header, validationResult } = require('express-validator');
const { makeValidationErrorResponse, tokenSanitizer, normalRateLimit, invalidJWTTokenMessage } = require('../../utils');

const User = require('../../models/user');
const Repository = require('../../auth/repository');
const Service = require('../../auth/service');
const Handler = require('../../handler/auth');

const router = require('express').Router();
const authRepository = new Repository(User);
const authService = new Service(authRepository);
const authHandler = new Handler(authService);

const invalidEmailMessage = 'Invalid email address';
const invalidPasswordMessage = 'Password must has minimum 8 characters, contains lower & uppercase, symbol, and number';

router.get(
  '/users/all',
  header('Authorization').customSanitizer(tokenSanitizer).isJWT().withMessage(invalidJWTTokenMessage),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return authHandler.v1GetAllUsers(req, res);
    };
    return makeValidationErrorResponse(res, errors);
  }
);

router.get(
  '/users/single',
  header('Authorization').customSanitizer(tokenSanitizer).isJWT().withMessage(invalidJWTTokenMessage),
  body('email').isEmail().withMessage(invalidEmailMessage),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return authHandler.v1GetUserByEmail(req, res);
    };
    return makeValidationErrorResponse(res, errors);
  }
);

router.post(
  '/register',
  normalRateLimit,
  body('email').isEmail().withMessage(invalidEmailMessage),
  body('password').isStrongPassword().withMessage(invalidPasswordMessage),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return authHandler.v1CreateUser(req, res);
    };
    return makeValidationErrorResponse(res, errors);
  }
);

router.post(
  '/login',
  normalRateLimit,
  body('email').isEmail().withMessage(invalidEmailMessage),
  body('password').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return authHandler.v1CreateToken(req, res);
    };
    return makeValidationErrorResponse(res, errors);
  }
);

module.exports = router;
