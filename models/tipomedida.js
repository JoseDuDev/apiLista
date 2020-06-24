'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoMedida = sequelize.define('TipoMedida', {
    nome: DataTypes.STRING,
    quantidade: DataTypes.INTEGER
  }, {});
  TipoMedida.associate = function(models) {
    // associations
  };
  return TipoMedida;
};