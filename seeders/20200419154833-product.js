'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('products', [ {
        name: 'Nike Air Jordan',
        price: 2000000
      },
      {
        name: 'Ventela Public Suede',
        price: 350000
      },
      {
        name: 'Compass x PMP',
        price: 3500000
      }], {});

  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('products', null, {});

  }
};
