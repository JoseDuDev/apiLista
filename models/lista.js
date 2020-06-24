'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lista = sequelize.define('Lista', {
    nome: DataTypes.STRING,
    usuarioid: DataTypes.INTEGER
  }, {});
  Lista.associate = function(models) {
    // associations can be defined here
  };
  return Lista;
};