const express = require('express')

const{
    createuser,
    getusers,
    getuserById
} = require('../controllers/user.controller')

const router = express.Router()

router.post('/',createuser)
router.get('/',getusers)
router.get('/:id',getuserById)

module.exports = router
