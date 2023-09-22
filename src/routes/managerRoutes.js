const express = require('express')
const router = express.Router()

const {
    createManager,
    getManagers,
    getManager,
    updateManager,
    deleteManager
} = require('../controllers/managerController')

router.get('/', getManagers)
router.get('/:id', getManager)
router.post('/', createManager)
router.put('/:id', updateManager)
router.delete('/:id', deleteManager)

module.exports = router