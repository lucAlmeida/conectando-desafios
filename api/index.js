const app = require('./src/app');
const sequelize = require('./src/config/database');

const Usuario = require('./src/usuario/Usuario');
const Proposta = require('./src/proposta/Proposta');
const Projeto = require('./src/projeto/Projeto');

sequelize.sync({ force: true });

app.listen(3000, () => console.log('app is running!'));
