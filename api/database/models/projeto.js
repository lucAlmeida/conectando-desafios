'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      projeto.hasOne(models.Proposta, { foreignKey: 'idProjeto' });
      projeto.belongsTo(models.Empresa, { onDelete: 'cascade', foreignKey: 'idUsuario' });
    }
  }
  projeto.init(
    {
      titulo: DataTypes.STRING,
      categoria: DataTypes.STRING,
      descricao: DataTypes.STRING,
      contato: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'projeto',
    }
  );
  return projeto;
};
