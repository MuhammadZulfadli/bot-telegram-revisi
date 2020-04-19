'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('order_items', [ {
        order_id: 2,
        product_id: 1,
        quantity: 10
      },
      {
        order_id: 1,
        product_id: 2,
        quantity: 10
      },
      {
        order_id: 3,
        product_id: 3,
        quantity: 10
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('order_items', null, {});

  }
};
