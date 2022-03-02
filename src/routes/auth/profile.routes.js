const express = require('express')
const router = express.Router()

const profileController = require('../../controllers/auth/profile.controller')

router.get('/profile', profileController.renderProfile)
router.post('/editProfile', profileController.editProfile)

module.exports = router