const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
//const environment = process.env.NODE_ENV;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
//console.log(dbName);
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: console.log,
});

sequelize.authenticate({ force: true })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
