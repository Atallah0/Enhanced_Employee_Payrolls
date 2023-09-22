const express = require('express')
const router = express.Router()

const {
    createPayroll,
    getPayrolls,
    getPayroll,
    updatePayroll,
    deletePayroll
} = require('../controllers/payrollController')

router.get('/', getPayrolls)
router.get('/:id', getPayroll)
router.post('/', createPayroll)
router.put('/:id', updatePayroll)
router.delete('/:id', deletePayroll)

module.exports = router