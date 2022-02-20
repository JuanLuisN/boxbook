const express = require('express')
const router = express.Router()

const landingPageController = require('../controllers/landingPage.controller')

router.get('/', landingPageController.renderLangingPage)

module.exports = router