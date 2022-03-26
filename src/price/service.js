class Service {
  constructor(repository) {
    this.repository = repository;
  }

  batchInsertPriceHistories(priceHistories) {
    return this.repository.bulkInsert(priceHistories);
  }
}

module.exports = Service;