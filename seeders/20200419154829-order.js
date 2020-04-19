'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('orders', [
      {
        user_id: 1,
        status: "accepted",
        driver_id: 3
      }, 
        
      {
        user_id: 3,
        status: "accepted",
        driver_id: 2
      },
      
      {
        user_id: 2,
        status: "done",
        driver_id: 1
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('orders', null, {});
      }
};
