const connection = require('../../database')
const helpers = require('../../database')

controller = {}

controller.renderLibros = async (req, res) => {
    const libros = await connection.query(`select * from userbooks where fk_usuario = ${req.user.id} order by id DESC`)
    res.render('system/myBooks',{
        libros
    })
}

controller.addBook = async (req, res) => {
    const puntaje = 0
    const { autor, titulo, paginas, imagen, fechaPublicacion, status } = req.body
    const newBook = {
        fk_usuario: req.user.id, autor, titulo, paginas, imagen, fechaPublicacion, status, puntaje
    }
    try {
        console.log(newBook)
        await connection.query('insert into userBooks set ?', [newBook])
        req.flash('success_msg', 'Libro agregado correctamente')
        res.redirect('/myBooks')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error, intentalo de nuevo')
        res.redirect('/myBooks')
    }
}

controller.editStatus = async (req, res) => {
    const { id } = req.params
    try {
        await connection.query(`update userbooks set status = 'Leyendo' where id = ${id}`)
        req.flash('success_msg', 'Se actualizo el estado del libro')
        res.redirect(`/myAdvances=${id}`)
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error, intentalo de nuevo')
        res.redirect('/myBooks')
    }
}

controller.addQualification = async (req, res) => {
    const { id } = req.params
    const { puntaje, resena } = req.body
    try {
        await connection.query(`update userbooks set puntaje = ${puntaje}, resena = '${resena}' where id = ${id}`)
        req.flash('success_msg', 'Se agrego la calificación correctamente')
        res.redirect('/myBooks')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error, intentalo de nuevo')
        res.redirect('/myBooks')
    }
}

controller.deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        await connection.query(`delete from userbooksadvance where fk_libro = ${id}`)
        await connection.query(`delete from userbooks where id = ${id}`)
        req.flash('error_msg', 'Se elimino el libro correctamente')
        res.redirect('/myBooks')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error, intentalo de nuevo')
        res.redirect('/myBooks')
    }
}

module.exports = controller