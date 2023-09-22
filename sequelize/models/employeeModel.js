const db = require('./index')
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING(50),
        age: DataTypes.INTEGER(3),
        managerId: {
            type: DataTypes.INTEGER(15),
            allowNull: true,
            references: {
                model: db.managers, // Reference the Managers model
                key: 'id', // Reference the ID column in Managers
                onDelete: 'CASCADE',
            },
        }
    }, {
        freezeTableName: true, // Disable the modifications of table names OR
        timestamps: false,
    })
    return Employee
}