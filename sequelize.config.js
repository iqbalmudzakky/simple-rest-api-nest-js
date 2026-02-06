require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'nestpass123',
    database: process.env.DB_NAME || 'nestdb_dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'nestpass123',
    database: process.env.DB_NAME_TEST || 'nestdb_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'nestpass123',
    database: process.env.DB_NAME || 'nestdb_prod',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
};
