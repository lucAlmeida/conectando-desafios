'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuario.hasMany(models.Token, { onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'idUsuario' });
      usuario.hasOne(models.Aluno, { foreignKey: 'id' });
      usuario.hasOne(models.Empresa, { foreignKey: 'id' });
      usuario.hasMany(models.Projeto, { onDelete: 'cascade', hooks: 'true', foreignKey: 'idUsuario' });
    }
  }
  usuario.init(
    {
      username: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      inactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      activationToken: DataTypes.STRING,
      perfilCorporativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'usuario',
    }
  );
  return usuario;
};
