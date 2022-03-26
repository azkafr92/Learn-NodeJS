/* eslint-disable camelcase */
'use strict';

const {generateUid, hashPassword} = require('../../src/utils');

module.exports = {
  async up(queryInterface, _Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('users', [
        {
          uid: generateUid(10),
          email: 'voronych17@icnwte.com',
          pwd_hash: hashPassword('1234567890'),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
        {
          uid: generateUid(10),
          email: 'tchoneys@nkgursr.com',
          pwd_hash: hashPassword('1234567890'),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
        {
          uid: generateUid(10),
          email: 'sagmayana@alvinneo.com',
          pwd_hash: hashPassword('1234567890'),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
        {
          uid: generateUid(10),
          email: 'justme6950@zipzy.site',
          pwd_hash: hashPassword('1234567890'),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
      ]);
      await queryInterface.bulkInsert('transactions', [
        {
          trx_id: 'a',
          user_id: 1,
          amount: 0.01000000,
          created_at: new Date('2022-03-07 09:55:44'),
          updated_at: new Date('2022-03-07 09:55:44'),
        },
        {
          trx_id: 'b',
          user_id: 1,
          amount: 0.02000000,
          created_at: new Date('2022-03-07 09:55:44'),
          updated_at: new Date('2022-03-07 09:55:44'),
        },
      ]);
      await queryInterface.bulkInsert('balances', [
        {
          user_id: 1,
          amount_available: 0.00674223,
          created_at: new Date('2022-03-07 09:57:13'),
          updated_at: new Date('2022-03-07 09:57:13'),
        },
        {
          user_id: 2,
          amount_available: 1.00000000,
          created_at: new Date('2022-03-07 09:57:13'),
          updated_at: new Date('2022-03-07 09:57:13'),
        },
        {
          user_id: 3,
          amount_available: 0.00000001,
          created_at: new Date('2022-03-07 09:57:13'),
          updated_at: new Date('2022-03-07 09:57:13'),
        },
        {
          user_id: 4,
          amount_available: 21.00000000,
          created_at: new Date('2022-03-07 09:57:13'),
          updated_at: new Date('2022-03-07 09:57:13'),
        },
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, _Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('transactions', null, {});
      await queryInterface.bulkDelete('balances', null, {});
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
