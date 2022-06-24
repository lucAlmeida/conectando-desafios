'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alunos', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alunos');
  },
};
