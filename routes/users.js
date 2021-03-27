const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")

router.post('/me', userController.insert)
router.get('/', userController.find)
module.exports = router
