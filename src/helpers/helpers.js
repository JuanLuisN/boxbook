const bcrypt = require('bcryptjs')
const connection = require('../database')

helpers = {}

helpers.encryptPassword = async (contra) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(contra, salt)
    return hash
}

helpers.matchPassword = async (contra, guardarContra) => {
    try {
        return await bcrypt.compare(contra, guardarContra)
    } catch (error) {
        console.log(error)
    }
}

helpers.emailExists = async (correo) => {
    const existe = await connection.query(`select * from usuarios where correo like '%${correo}%'`)
    return existe.length > 0 ? true : false
}

module.exports = helpers