'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define('order_item', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  order_item.associate = function(models) {
    // associations can be defined here
    order_item.belongsTo(models.order,{
      foreignKey: 'order_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
    order_item.belongsTo(models.product,{
      foreignKey: 'product_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  };
  return order_item;
};