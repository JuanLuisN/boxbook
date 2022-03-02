const connection = require('../../database')
const passport = require('passport')

controller = {}

controller.renderSignin = (req, res) => {
    res.render('auth/signin')
}

controller.renderSignup = (req, res) => {
    res.render('auth/signup')
}

controller.signIn = passport.authenticate('local.signin', {
    successRedirect: '/myBooks',
    failureRedirect: '/signin',
    failureFlash: true
})

controller.signUp = passport.authenticate('local.signup', {
    successRedirect: '/myBooks',
    failureRedirect: '/signup',
    failureFlash: true
})

controller.logOut = (req, res, next) => {
    req.logOut()
    res.redirect('/signin')
}

module.exports = controller