const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const helpers = require('../helpers/helpers')
const connection = require('../database')

//Para iniciar sesión
passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, correo, contra, done) => {
    const rows = await connection.query(`select * from usuarios where correo = '${correo}'`)
    if (rows.length > 0) {
        const usuario = rows[0]
        const validarContra = await helpers.matchPassword(contra, usuario.contra)
        if (validarContra) {
            done(null, usuario, req.flash('success_msg', `Bienvenido ${usuario.username}`))
        } else{
            done(null, false, req.flash('error_msg', 'Contraseña incorrecta. Intentalo de nuevo'))
        }
    } else{
        return done(null, false, req.flash('error_msg', 'El correo no existe. Intentalo de nuevo'))
    }
}))

//Para registrarse
passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, correo, contra, done) => {
    const existeCorreo = await helpers.emailExists(correo)
    if (!existeCorreo) {
        const { username, nombreCompleto, pais, ciudad } = req.body
        const nuevoUsuario = {
            username,
            nombreCompleto,
            correo,
            contra,
            pais,
            ciudad,
            objetivoAnual: 0
        }
        nuevoUsuario.contra = await helpers.encryptPassword(contra)
        const resultado = await connection.query('insert into usuarios set ?', [nuevoUsuario])
        req.flash('success_msg', 'Cuenta registrada correctamente')
        nuevoUsuario.id = resultado.insertId
        return done(null, nuevoUsuario)
    } else {
        return done(null, false, req.flash('error_msg', 'El correo ingresado ya se encuentra registrado'))
    }
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await connection.query(`select * from usuarios where id = ${id}`)
    done(null, rows[0])
})