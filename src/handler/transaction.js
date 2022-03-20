const {validationResult} = require('express-validator');

const v1CreateTransaction = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
		return;
	}

	res.json({status: 200, message: 'OK'});
};

module.exports = {v1CreateTransaction};
