'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    user_id: DataTypes.STRING,
    status: DataTypes.STRING,
    driver_id: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.customer,{
      foreignKey: 'user_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })

    order.belongsTo(models.driver,{
      foreignKey: 'driver_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })

    order.hasMany(models.order_item,{
      foreignKey: 'order_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  };
  return order;
};