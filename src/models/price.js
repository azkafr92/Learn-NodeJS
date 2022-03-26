const {DataTypes, Model} = require('sequelize');
const db = require('../config/config');

class Price extends Model {}

Price.init({
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticker: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coinId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exchange: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invalid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  recordTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  usd: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  idr: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  hnst: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  eth: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  btc: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  idr: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
});

module.exports = Price;
