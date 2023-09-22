const db = require('../../sequelize/models')
// create main Model
const Payrolls = db.payrolls

// Functions
// Create payroll
const createPayroll = async (req, res) => {
    const { date, basic_salary, extra_work_hours, extra_paid, bonus, income_tax, percent, employeeId } = req.body
    try {
        const payroll = await Payrolls.create({ date, basic_salary, extra_work_hours, extra_paid, bonus, income_tax, percent, employeeId })
        res.status(201).json({ success: true, data: payroll });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Get all payrolls
const getPayrolls = async (req, res) => {
    try {
        const payrolls = await Payrolls.findAll()
        res.status(200).json({ success: true, data: payrolls });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Get payroll by id
const getPayroll = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const payroll = await Employees.findByPk(id)
        if (!payroll) {
            return res.status(404).json({ success: false, msg: `No payroll with id: ${id} is found` });
        }
        res.status(200).json({ success: true, data: payroll });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Update employee info by id
const updatePayroll = async (req, res) => {
    const id = Number(req.params.id);
    const { date, basic_salary, extra_work_hours, extra_paid, bonus, income_tax, percent, employeeId } = req.body

    try {
        const updatedRecord = await Payrolls.update({ date, basic_salary, extra_work_hours, extra_paid, bonus, income_tax, percent, employeeId }, { where: { id } })  // boolean true or false (0 or 1)
        if (updatedRecord === 0) {
            return res.status(404).json({ success: false, msg: `No payrolls with id: ${id} is updated` });
        }
        const updatedPayroll = await Payrolls.findByPk(id)
        res.status(200).json({ success: true, data: updatedPayroll });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Delete payroll by id
const deletePayroll = async (req, res) => {
    const id = Number(req.params.id)
    try {
        const deletedPayroll = await Payrolls.destroy({ where: { id } });  // boolean true or false (0 or 1)
        if (deletedPayroll === 0) {
            return res.status(404).json({ success: false, msg: `No payroll with id: ${id} is deleted` });
        }
        res.status(200).json({ success: true, msg: 'payroll deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }

}

module.exports = {
    createPayroll,
    getPayrolls,
    getPayroll,
    updatePayroll,
    deletePayroll
}