const db = require('./index')
module.exports = (sequelize, DataTypes) => {
    const Payroll = sequelize.define('payroll', {
        id: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        basic_salary: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        extra_work_hours: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        extra_paid: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        bonus: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        income_tax: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        percent: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        employeeId: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            references: {
                model: db.employees, // Reference the Managers model
                key: 'id', // Reference the ID column in Managers
                onDelete: 'CASCADE',
            },
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            grossSalary() {
                return this.calculateGrossSalary();
            },
        },
    });

    Payroll.prototype.calculateGrossSalary = function () {
        const { basic_salary, extra_work_hours, extra_paid, bonus } = this;
        // Calculate the gross salary using your formula
        const grossSalary = basic_salary + (extra_work_hours * extra_paid) + bonus;
        return grossSalary;
    };

    // Add association to the Employee model
    // Payroll.belongsTo(sequelize.models.Employee, {
    //     foreignKey: 'employeeId',
    //     onDelete: 'CASCADE',
    // as: 'employee'
    // });

    return Payroll;
};
