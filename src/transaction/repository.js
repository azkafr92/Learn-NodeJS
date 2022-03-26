const db = require('../config/config');
const { sleep } = require('../utils');
const delaySeconds = 1;

class Repository {
  constructor(model) {
    this.model = model;
  }

  insert = async (trxId, userId, amountToTransact) => {
    const t = await db.transaction();
    let err;
    let transaction;
    try {
      transaction = await this.model.create({trxId, userId, amount: amountToTransact}, { transaction: t });

      sleep(1000 * delaySeconds);

      await t.commit();
      return [err, transaction];
    } catch (err) {
      await t.rollback();
      return [err, transaction];
    }
  };
}

module.exports = Repository;
