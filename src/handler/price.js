const csv = require('fast-csv');
const fs = require('fs');
const {validationResult} = require('express-validator');

const v1GetLowHighPrice = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
		return;
	}

	res.json({status: 200, message: 'OK'});
};

const v1GetHistoricalPrice = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({status: 400, message: 'Bad request', errors: errors.array()});
		return;
	}

	res.json({status: 200, message: 'OK'});
};

const v1UploadPrice = (req, res) => {
	csv.parseFile(req.file.path, {headers: true, maxRows: 5})
		.on('data', data => console.log(data))
		.on('end', () => fs.unlinkSync(req.file.path));

	res.json({
		status: 200, message: 'OK', data: {fileInfo: req.file, text: req.body},
	});
};

module.exports = {v1GetLowHighPrice, v1GetHistoricalPrice, v1UploadPrice};
