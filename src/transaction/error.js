class TransactionError extends Error {
  constructor({ message, name, data, statusCode }) {
    super(message);
    this.name = name;
    this.data = data;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class InsufficientBalanceError extends TransactionError {
  constructor(data) {
    super({
      message: 'Insufficient balance',
      name: 'InsufficientBalanceError',
      data,
      statusCode: 400,
    });
  }
}

class CreateTransactionError extends TransactionError {
  constructor(message, data) {
    super({
      message,
      name: 'CreateTransactionError',
      data,
      statusCode: 400,
    });
  }
}

module.exports = {
  InsufficientBalanceError,
  CreateTransactionError,
};