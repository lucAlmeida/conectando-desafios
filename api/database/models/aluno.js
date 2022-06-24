'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  aluno.init(
    {
      nome: DataTypes.STRING,
      localidade: DataTypes.STRING,
      curso: DataTypes.STRING,
      sobre: DataTypes.STRING,
      semestre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'aluno',
    }
  );
  return aluno;
};
