const {validationResult} = require('express-validator');

class Handler {
	constructor(service) {
		this.service = service;
	}

	v1CreateUser(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
			return;
		}

		res.json({code: 200, message: 'OK'});
	}

	v1CreateToken(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
			return;
		}

		res.json({status: 200, message: 'OK'});
	}
}

module.exports = Handler;
