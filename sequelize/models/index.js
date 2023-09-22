const dbConfig = require('../config/dbConfig')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to authenticate with the database:', err);
  });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.managers = require('./managerModel')(sequelize, DataTypes)
db.employees = require('./employeeModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!');
  })

module.exports = db