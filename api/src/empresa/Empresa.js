const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;

class Empresa extends Model {}

Empresa.init(
  {
    nome: {
      type: Sequelize.STRING,
    },
    responsavel: {
      type: Sequelize.STRING,
    },
    categoria: {
      type: Sequelize.STRING,
    },
    localidade: {
      type: Sequelize.STRING,
    },
    cnpj: {
      type: Sequelize.STRING,
    },
    idUsuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'empresa',
  }
);

module.exports = Empresa;
