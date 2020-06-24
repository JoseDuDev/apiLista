'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setor = sequelize.define('Setor', {
    nome: DataTypes.STRING
  }, {});
  Setor.associate = function(models) {
    Setor.hasMany(models.Produto);
  };
  return Setor;
};
