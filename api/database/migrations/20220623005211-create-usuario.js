'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('usuarios', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        return queryInterface.addColumn('tokens', 'idUsuario', {
          type: Sequelize.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  },
};
