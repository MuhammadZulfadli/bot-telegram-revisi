'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('drivers', [
        {
          full_name: "Muhammad Zulfadli",
          phone_number: "085760860595"
        },
          {
          full_name: "Rohmad Azhari",
          phone_number: "085760860595"
        },
          {
          full_name: "Gufron Hidayat",
          phone_number: "085760860595"
        },
    ], 
      {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('drivers', null, {});
  }
};
