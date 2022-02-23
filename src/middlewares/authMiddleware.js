const authMiddleware = {}
const helpers = require('../helpers/helpers')

authMiddleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error_msg', 'Inicia sesión para acceder')
    res.redirect('/signin')
}

authMiddleware.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

module.exports = authMiddleware