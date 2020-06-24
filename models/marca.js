'use strict';
module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define('Marca', {
    nome: DataTypes.STRING
  }, {});
  Marca.associate = function(models) {
    Marca.hasMany(models.Produto);
  };
  return Marca;
};
