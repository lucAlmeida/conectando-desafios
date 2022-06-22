const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Proposta = require('../proposta/Proposta');
const Empresa = require('../empresa/Empresa');

const Model = Sequelize.Model;

class Projeto extends Model {}

Projeto.init(
  {
    titulo: {
      type: Sequelize.STRING,
    },
    categoria: {
      type: Sequelize.STRING,
    },
    descricao: {
      type: Sequelize.STRING,
    },
    contato: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'projeto',
  }
);

Projeto.hasOne(Proposta, { foreignKey: 'idProjeto' });
Projeto.belongsTo(Empresa, { onDelete: 'cascade', foreignKey: 'idUsuario' });

module.exports = Projeto;
