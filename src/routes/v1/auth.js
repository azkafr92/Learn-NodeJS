const router = require('express').Router();
const {body} = require('express-validator');
const {v1CreateUser, v1CreateToken} = require('../../handler/auth');
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
	v1CreateUser,
);

router.post(
	'/login',
	body('email')
		.isEmail()
		.withMessage(invalidEmailMessage),
	body('password').notEmpty(),
	v1CreateToken,
);

module.exports = router;
