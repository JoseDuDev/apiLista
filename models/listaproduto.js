'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListaProduto = sequelize.define('ListaProduto', {
    listaid: DataTypes.INTEGER,
    produtoid: DataTypes.INTEGER
  }, {});
  ListaProduto.associate = function(models) {
    ListaProduto.belongsTo(models.Lista);
    ListaProduto.Produto = ListaProduto.belongsTo(models.Produto);
  };
  return ListaProduto;
};