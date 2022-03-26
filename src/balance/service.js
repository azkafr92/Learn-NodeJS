require('dotenv').config();

const {decodeToken} = require('../utils');

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  decodeToken = (token) => {
    return decodeToken(token);
  };

  getUserBalance(user) {
    return this.repository.findByUserId(user.id);
  }

  updateUserBalance(userId, newBalance) {
    return this.repository.updateByUserId(userId, { balance: newBalance });
  }
}

module.exports = Service;