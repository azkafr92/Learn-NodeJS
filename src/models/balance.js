const {DataTypes, Model} = require('sequelize');
const db = require('../config/config');

class Balance extends Model { }

Balance.init({
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
  },
  amountAvailable: {
    type: DataTypes.DECIMAL(20, 10),
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: db,
  underscored: true,
});

module.exports = Balance;
