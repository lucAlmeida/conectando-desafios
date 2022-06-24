const profiles = require('../config');
const dbConfigs = {};

Object.keys(profiles).forEach((profile) => {
  dbConfigs[profile] = { ...profiles[profile].database };
});

module.exports = dbConfigs;

// {
//   "development": {
//     "username": "my-db-user",
//     "password": "db-p4ss",
//     "database": "conectando_desafios",
//     "host": "localhost",
//     "dialect": "sqlite",
//     "storage": "./database.sqlite"
//   }
// }
