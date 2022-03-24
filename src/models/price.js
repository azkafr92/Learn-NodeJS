const {DataTypes, Model} = require('sequelize');
const db = require('../config/config');

class Price extends Model {}

Price.init({
	id: {
		type: DataTypes.INTEGER(11),
		autoIncrement: true,
		primaryKey: true,
	},
}, {
	sequelize: db,
	underscored: true,
});

module.exports = Price;
