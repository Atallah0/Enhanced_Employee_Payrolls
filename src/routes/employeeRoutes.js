const express = require('express')
const router = express.Router()

const {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController')

router.get('/', getEmployees)
router.get('/:id', getEmployee)
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router