'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proposta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  proposta.init(
    {
      observacao: DataTypes.STRING,
      status: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      assignedTo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'proposta',
    }
  );
  return proposta;
};
