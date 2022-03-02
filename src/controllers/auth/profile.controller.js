const connection = require('../../database')
const helpers = require('../../helpers/helpers')

controller = {}

controller.renderProfile = (req, res) => {
    res.render('auth/profile')
}

controller.editProfile = async (req, res) => {
    const correoRegistrado = await connection.query(`select correo from usuarios where id = ${req.user.id}`)
    const { username, nombreCompleto, correo, contra, pais, ciudad, objetivoAnual } = req.body
    const nuevoUsuario = {
        username,
        nombreCompleto,
        correo,
        contra,
        pais,
        ciudad,
        objetivoAnual
    }
    try {
        if (correoRegistrado[0].correo == correo) {       
            nuevoUsuario.contra = await helpers.encryptPassword(nuevoUsuario.contra)
            await connection.query(`update usuarios set username = ?, nombreCompleto = ?, correo = ?, contra = ?, pais = ?, ciudad = ?, objetivoAnual = ? where id = ?`, 
                [nuevoUsuario.username, nuevoUsuario.nombreCompleto, nuevoUsuario.correo, nuevoUsuario.contra, nuevoUsuario.pais, nuevoUsuario.ciudad, nuevoUsuario.objetivoAnual, req.user.id])
            req.flash('success_msg', 'Se edito el perfil correctamente')
            res.redirect('/profile')
        }else{
            const existeCorreo = await helpers.emailExists(correo)
            if(!existeCorreo){
                nuevoUsuario.contra = await helpers.encryptPassword(nuevoUsuario.contra)
                await connection.query(`update usuarios set username = ?, nombreCompleto = ?, correo = ?, contra = ?, pais = ?, ciudad = ?, objetivoAnual = ? where id = ?`, 
                    [nuevoUsuario.username, nuevoUsuario.nombreCompleto, nuevoUsuario.correo, nuevoUsuario.contra, nuevoUsuario.pais, nuevoUsuario.ciudad, nuevoUsuario.objetivoAnual, req.user.id])
                req.flash('success_msg', 'Se edito el perfil correctamente')
                res.redirect('/profile')
            }else{
                req.flash('error_msg', 'El correo se encuentra registrado. Ingresa un correo diferente')
                res.redirect('/profile')
            }
        }
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error, intentalo de nuevo')
        res.redirect('/profile')
    }
}

module.exports = controller