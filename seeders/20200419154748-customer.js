'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('customers', [
        {
          full_name: "Muhammad Zulfadli",
          username: "ipay48",
          email: "ipay48@mail.com",
          phone_number: "085760860595"
      },
      {
        full_name: "Jordi Pascal",
        username: "jordical",
        email: "jordical@mail.com",
        phone_number: "085760860595"
      },
      {
        full_name: "Hanif Ataki",
        username: "hann",
        email: "hann@mail.com",
        phone_number: "085760860595"
      }
    ], 
    {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('customers', null, {});
  }
};
