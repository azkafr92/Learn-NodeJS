const {validationResult} = require('express-validator');

const v1CreateUser = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
		return;
	}

	res.json({code: 200, message: 'OK'});
};

const v1CreateToken = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
		return;
	}

	res.json({status: 200, message: 'OK'});
};

module.exports = {v1CreateUser, v1CreateToken};
