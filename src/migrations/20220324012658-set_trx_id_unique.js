'use strict';

module.exports = {
	async up(queryInterface, _Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addConstraint('transactions', {
				type: 'unique',
				fields: ['trx_id'],
				name: 'transactions_trx_id_unique',
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, _Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeConstraint('transactions', 'transactions_trx_id_unique');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
