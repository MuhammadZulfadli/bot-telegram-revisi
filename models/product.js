'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.hasMany(models.order_item,{
    foreignKey: 'product_id',
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  };
  return product;
};