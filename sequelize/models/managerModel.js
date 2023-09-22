module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define('manager', {
        id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING(50),
    }, {
        freezeTableName: true, // Disable the modifications of table names OR
        timestamps: false,
    })
    return Manager
}