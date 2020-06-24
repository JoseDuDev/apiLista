'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: DataTypes.STRING,
    setorid: DataTypes.INTEGER,
    marcaid: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL
  }, {});
  Produto.associate = function(models) {
    Produto.Marca = Produto.belongsTo(models.Marca);
    Produto.Setor = Produto.belongsTo(models.Setor);
  };
  return Produto;
};