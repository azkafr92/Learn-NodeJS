class PriceError extends Error {
  constructor({ message, name, data, statusCode }) {
    super(message);
    this.name = name;
    this.data = data;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class PriceUploadError extends PriceError {
  constructor(data) {
    super({
      message: 'Only csv file allowed',
      name: 'PriceUploadError',
      data,
      statusCode: 400,
    });
  }
}

module.exports = {
  PriceUploadError,
};
