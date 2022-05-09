'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'NFT',
        'price',
         Sequelize.INTEGER
       ),
      queryInterface.sequelize.query(
        "update NFT Set price = 200"
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'NFT',
        'price'
       )
    ]);
  }
};
