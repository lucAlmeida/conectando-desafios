module.exports = {
  database: {
    database: 'conectando_desafios',
    username: 'my-db-user',
    password: 'db-p4ss',
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    timezone: '-03:00',
  },
  mail: {
    host: 'localhost',
    port: 8587,
    tls: {
      rejectUnauthorized: false,
    },
  },
};
