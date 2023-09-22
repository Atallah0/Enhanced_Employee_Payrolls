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
    }, {
        freezeTableName: true, // Disable the modifications of table names OR
        timestamps: false,
    })
    return Employee
}