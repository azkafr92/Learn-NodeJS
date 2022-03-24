const {body} = require('express-validator');
const Repository = require('../../auth/repository');
const Service = require('../../auth/service');
const Handler = require('../../handler/auth');

const router = require('express').Router();

const db = require('../../config/config');
const authRepository = new Repository(db);
const authService = new Service(authRepository);
const authHandler = new Handler(authService);

const invalidEmailMessage = 'Invalid email address';
const invalidPasswordMessage = 'Password must has minimum 8 characters, '
    + 'contains lower & uppercase, symbol, and number';

router.post(
	'/register',
	body('email')
		.isEmail()
		.withMessage(invalidEmailMessage),
	body('password')
		.isStrongPassword()
		.withMessage(invalidPasswordMessage),
	authHandler.v1CreateUser,
);

router.post(
	'/login',
	body('email')
		.isEmail()
		.withMessage(invalidEmailMessage),
	body('password').notEmpty(),
	authHandler.v1CreateToken,
);

module.exports = router;
