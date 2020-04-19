'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
    customer.hasMany(models.order,{
      foreignKey: 'user_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  };
  return customer;
};