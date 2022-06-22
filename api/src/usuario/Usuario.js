const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Token = require('../auth/Token');
const Aluno = require('../aluno/Aluno');
const Empresa = require('../empresa/Empresa');
const Projeto = require('../projeto/Projeto');

const Model = Sequelize.Model;

class Usuario extends Model {}

Usuario.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    inactive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    activationToken: {
      type: Sequelize.STRING,
    },
    perfilCorporativo: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'usuario',
  }
);

Usuario.hasMany(Token, { onDelete: 'cascade', foreignKey: 'idUsuario' });
Usuario.hasOne(Aluno, { foreignKey: 'idUsuario' });
Usuario.hasOne(Empresa, { foreignKey: 'idUsuario' });
Usuario.hasMany(Projeto, { onDelete: 'cascade', hooks: 'true', foreignKey: 'idUsuario' });

module.exports = Usuario;
