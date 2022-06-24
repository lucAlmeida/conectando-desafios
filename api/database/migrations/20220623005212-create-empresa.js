'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('empresas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: { model: 'usuarios', key: 'id' },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
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
        return queryInterface.addColumn('projetos', 'idUsuario', {
          type: Sequelize.INTEGER,
          references: {
            model: 'empresas',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('empresas');
  },
};
