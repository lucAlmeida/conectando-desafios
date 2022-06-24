'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('projetos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
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
        return queryInterface.addColumn('propostas', 'idProjeto', {
          type: Sequelize.INTEGER,
          references: {
            model: 'projetos',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projetos');
  },
};
