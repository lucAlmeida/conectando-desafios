// module.exports = {
//   database: {
//     database: process.env.DATABASE_URL,
//     dialect: 'postgres',
//     logging: false,
//     // timezone: '-03:00',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   },
//   mail: {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: 'vkipo7jzabz6fxgi@ethereal.email',
//       pass: 'DDkBxJWtsgSqbPpS9D',
//     },
//   },
// };

// module.exports = {
//   database: {
//     database: 'conectando_desafios',
//     username: 'postgres',
//     password: 'root',
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false,
//     // timezone: '-03:00',
//   },
//   mail: {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: 'vkipo7jzabz6fxgi@ethereal.email',
//       pass: 'DDkBxJWtsgSqbPpS9D',
//     },
//   },
// };

// Uncomment below to use SQLite instead of Postgres:

module.exports = {
  database: {
    database: 'conectando_desafios',
    username: 'my-db-user',
    password: 'db-p4ss',
    dialect: 'sqlite',
    storage: './prod-db.sqlite',
    logging: false,
    // timezone: '-03:00',
  },
  mail: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'vkipo7jzabz6fxgi@ethereal.email',
      pass: 'DDkBxJWtsgSqbPpS9D',
    },
  },
};
