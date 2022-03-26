class UserError extends Error {
  constructor({ message, name, data, statusCode }) {
    super(message);
    this.name = name;
    this.data = data;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UserNotFoundError extends UserError {
  constructor(data) {
    super({
      message: 'This email is not registed as user or has been removed.',
      name: 'UserNotFoundError',
      data,
      statusCode: 400,
    });
  }
}

class UserExistsError extends UserError {
  constructor(data) {
    super({
      message: 'There is already a user registered with this email',
      name: 'UserExistsError',
      data,
      statusCode: 400,
    });
  }
}

class UserEmailOrPasswordError extends UserError {
  constructor(data) {
    super({
      message: 'Invalid email or password',
      name: 'UserEmailOrPasswordError',
      data,
      statusCode: 400,
    });
  }
}

module.exports = {
  UserNotFoundError,
  UserExistsError,
  UserEmailOrPasswordError,
};