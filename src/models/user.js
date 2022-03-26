const {DataTypes, Model} = require('sequelize');
const db = require('../config/config');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pwdHash: {
    type: DataTypes.STRING,
    allowNull: false,
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
  paranoid: true,
  underscored: true,
});

module.exports = User;
