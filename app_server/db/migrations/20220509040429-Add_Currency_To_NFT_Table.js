'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'NFT',
        'currency',
         Sequelize.STRING
       ),
      queryInterface.sequelize.query(
        "update NFT Set currency = 'INR'"
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'NFT',
        'currency'
       )
    ]);
  }
};
