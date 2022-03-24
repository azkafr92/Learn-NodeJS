const bcrypt = require('bcrypt');
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

module.exports = {generateUid, hashPassword};
