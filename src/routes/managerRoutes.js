const express = require('express')
const router = express.Router()

const {
    createManager,
    getManagers,
    getManager,
    updateManager,
    deleteManager,
    getManagerEmployees
} = require('../controllers/managerController')

router.get('/', getManagers)
router.get('/:id', getManager)
router.post('/', createManager)
router.put('/:id', updateManager)
router.delete('/:id', deleteManager)
router.get('/employees/:id', getManagerEmployees)

module.exports = router