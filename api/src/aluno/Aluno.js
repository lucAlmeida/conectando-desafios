const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;

class Aluno extends Model {}

Aluno.init(
  {
    nome: {
      type: Sequelize.STRING,
    },
    localidade: {
      type: Sequelize.STRING,
    },
    curso: {
      type: Sequelize.STRING,
    },
    sobre: {
      type: Sequelize.STRING,
    },
    semestre: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'aluno',
  }
);

module.exports = Aluno;
