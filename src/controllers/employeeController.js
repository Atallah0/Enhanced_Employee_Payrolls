const db = require('../../sequelize/models')
// create main Model
const Employees = db.employees
const Payrolls = db.payrolls // TO-DO

// Functions
// Create employee
const createEmployee = async (req, res) => {
    const { name, age, managerId } = req.body
    try {
        const employee = await Employees.create({ name, age, managerId })
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employees.findAll()
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Get employee by id
const getEmployee = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const employee = await Employees.findByPk(id)
        if (!employee) {
            return res.status(404).json({ success: false, msg: `No employee with id: ${id} is found` });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Update employee info by id
const updateEmployee = async (req, res) => {
    const id = Number(req.params.id);
    const { name, age, managerId } = req.body

    try {
        const updatedRecord = await Employees.update({ name, age, managerId }, { where: { id } })  // boolean true or false (0 or 1)
        if (updatedRecord === 0) {
            return res.status(404).json({ success: false, msg: `No employees with id: ${id} is updated` });
        }
        const updatedEmployee = await Employees.findByPk(id)
        res.status(200).json({ success: true, data: updatedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Delete employee by id
const deleteEmployee = async (req, res) => {
    const id = Number(req.params.id)
    try {
        const deletedEmployee = await Employees.destroy({ where: { id } });  // boolean true or false (0 or 1)
        if (deletedEmployee === 0) {
            return res.status(404).json({ success: false, msg: `No employee with id: ${id} is deleted` });
        }
        res.status(200).json({ success: true, msg: 'employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }

}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
}