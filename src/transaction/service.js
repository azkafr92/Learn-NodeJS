const { InsufficientBalanceError, CreateTransactionError } = require('./error');
const { decodeToken, trimNumber } = require('../utils');

class Service {
  constructor(transactionRepository, balanceRepository) {
    this.tr = transactionRepository;
    this.br = balanceRepository;
  }

  decodeToken = (token) => {
    return decodeToken(token);
  };

  saveTransaction = async (trxId, userId, amountToTransact) => {
    const userBalance = await this.br.findByUserId(userId);
    if (userBalance.amountAvailable >= amountToTransact) {
      const [err, transaction] = await this.tr.insert(trxId, userId, amountToTransact);
      if (err) {
        return Promise.reject(new CreateTransactionError(err.name, err.errors));
      } else if (transaction) {
        transaction.amount = trimNumber(transaction.amount);

        const newAmountAvailable = userBalance.amountAvailable - amountToTransact;
        await this.br.updateByUserId(userId, { amountAvailable: newAmountAvailable });

        const updatedUserBalance = await this.br.findByUserId(userId);
        updatedUserBalance.amountAvailable = trimNumber(updatedUserBalance.amountAvailable);

        return Promise.resolve([transaction, updatedUserBalance]);
      }
    } else {
      return Promise.reject(new InsufficientBalanceError({trxId, userId, amountToTransact}));
    }
  };
}

module.exports = Service;