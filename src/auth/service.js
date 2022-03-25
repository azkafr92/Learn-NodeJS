require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateUid, hashPassword } = require('../utils');

const {UserNotFoundError, UserExistsError, UserEmailOrPasswordError} = require('./error');

const TOKEN_EXPIRY = 3600;

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  static generateToken = (email, id) => {
    return jwt.sign({ email, id }, process.env.TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY });
  };

  verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      let errorMessage = null;
      let isVerified = false;
      if (err) {
        errorMessage = { message: err.message, statusCode: 400 };
      } else {
        const user = await this.repository.findByEmail(decoded.email);
        if (user) {
          isVerified = true;
        }
      }

      return [errorMessage, isVerified];
    });
  };

  getAllUsers() {
    return this.repository.findAll();
  }

  getUserByEmail = async (email) => {
    const user = await this.repository.findByEmail(email);
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new UserNotFoundError({ email }));
    }
  };

  async createUser(email, password) {
    const user = await this.repository.findByEmail(email, true);
    if (user) {
      return Promise.reject(new UserExistsError({ email }));
    } else {
      return this.repository.insert(generateUid(20), email, hashPassword(password));
    }

  }

  async createToken(email, password) {
    const user = await this.repository.findByEmail(email);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.pwdHash);
      if (!isValidPassword) {
        return Promise.reject(new UserEmailOrPasswordError({ email }));
      } else {
        return Promise.resolve(Service.generateToken(email, user.id));
      }
    } else {
      return Promise.reject(new UserNotFoundError({ email }));
    }
  }
}

module.exports = Service;
