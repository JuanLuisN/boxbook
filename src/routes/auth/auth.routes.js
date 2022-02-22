const express = require('express')
const router = express.Router()

const authController = require('../../controllers/auth/auth.controller')

router.get('/signin', authController.renderSignin)

module.exports = router