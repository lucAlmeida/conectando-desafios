'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  empresa.init(
    {
      nome: DataTypes.STRING,
      responsavel: DataTypes.STRING,
      categoria: DataTypes.STRING,
      localidade: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      // idUsuario: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: true,
      // },
    },
    {
      sequelize,
      modelName: 'empresa',
    }
  );
  return empresa;
};
