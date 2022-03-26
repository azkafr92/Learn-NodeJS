const db = require('../config/config');

class Repository {
  constructor(model) {
    this.model = model;
  }

  bulkInsert(priceHistories) {
    return this.model.bulkCreate(priceHistories, { ignoreDuplicates: true });
  }
}

module.exports = Repository;