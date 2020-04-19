'use strict';
module.exports = (sequelize, DataTypes) => {
  const driver = sequelize.define('driver', {
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {});
  driver.associate = function(models) {
    // associations can be defined here
    driver.hasMany(models.order,{
      foreignKey: 'driver_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  };
  return driver;
};