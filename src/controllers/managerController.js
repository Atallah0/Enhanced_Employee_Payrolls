const db = require('../../sequelize/models')
// create main Model
const Managers = db.managers
const Employees = db.employees  // for the last function


//Functions

// Create manager 
const createManager = async (req, res) => {
    const { name } = req.body
    try {
        const manager = await Managers.create({ name })
        res.status(201).json({ success: true, data: manager });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Get all managers
const getManagers = async (req, res) => {
    try {
        const managers = await Managers.findAll()
        res.status(200).json({ success: true, data: managers });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Get manager by id
const getManager = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const manager = await Managers.findByPk(id)
        if (!manager) {
            return res.status(404).json({ success: false, msg: `No manager with id: ${id} is found` });
        }
        res.status(200).json({ success: true, data: manager });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Update manager info by id
const updateManager = async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body

    try {
        const updatedRecord = await Managers.update({ name }, { where: { id } })  // boolean true or false (0 or 1)
        if (updatedRecord === 0) {
            return res.status(404).json({ success: false, msg: `No managers with id: ${id} is updated` });
        }
        const updatedManager = await Managers.findByPk(id)
        res.status(200).json({ success: true, data: updatedManager });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// Delete manager by id
const deleteManager = async (req, res) => {
    const id = Number(req.params.id)
    try {
        const deletedManager = await Managers.destroy({ where: { id } });  // boolean true or false (0 or 1)
        if (deletedManager === 0) {
            return res.status(404).json({ success: false, msg: `No manager with id: ${id} is deleted` });
        }
        res.status(200).json({ success: true, msg: 'manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }

}

// Get employees for the manager by manager id
const getManagerEmployees = async (req, res) => {
    const managerId = Number(req.params.id);
    try {
        const manager = await Managers.findByPk(managerId, {
            include: [
                {
                    model: Employees,
                    as: 'employee',
                },
            ],
        });

        if (!manager) {
            return res.status(404).json({ success: false, msg: `No manager with id: ${managerId} is found` });
        }

        const employees = manager.employee;

        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}



module.exports = {
    createManager,
    getManagers,
    getManager,
    updateManager,
    deleteManager,
    getManagerEmployees
}