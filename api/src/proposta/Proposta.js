const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;

class Proposta extends Model {}

Proposta.init(
  {
    observacao: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
    assignedTo: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'proposta',
  }
);

module.exports = Proposta;
