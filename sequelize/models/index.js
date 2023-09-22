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
db.payrolls = require('./payrollModel')(sequelize, DataTypes)


db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!');
  })

// 1:N between manager and employees
db.managers.hasMany(db.employees, {
  foreignKey: 'managerId',
  as: 'employee'
})

db.employees.belongsTo(db.managers, {
  foreignKey: 'managerId',
  // onDelete: 'CASCADE',
  as: 'manager'
})

// 1:N between employee and payrolls
db.employees.hasMany(db.payrolls, {
  foreignKey: 'employeeId',
  as: 'payroll'
})

db.payrolls.belongsTo(db.employees, {
  foreignKey: 'employeeId',
  // onDelete: 'CASCADE',
  as: 'employee'
})

module.exports = db