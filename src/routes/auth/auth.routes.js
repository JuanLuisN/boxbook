const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const authController = require('../../controllers/auth/auth.controller')

router.get('/signin', authMiddleware.isNotLoggedIn, authController.renderSignin)
router.get('/signup', authMiddleware.isNotLoggedIn, authController.renderSignup)
router.get('/logout', authMiddleware.isLoggedIn, authController.logOut)

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)


module.exports = router