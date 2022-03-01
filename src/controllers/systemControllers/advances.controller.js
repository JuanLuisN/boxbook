const connection = require('../../database')

controller = {}

controller.renderAvances = async (req, res) => {
    const { id } = req.params
    const avances = await connection.query(`select * from userbooksadvance where fk_libro = ${id} and fk_usuario = ${req.user.id}`)
    const ultimaPag = await connection.query(`select MAX(paginasLeidas) as nopagina from userbooksadvance where fk_libro = ${id} and fk_usuario = ${req.user.id}`)
    const libros = await connection.query(`select autor, titulo, paginas, imagen from userbooks where id = ${id}`)
    res.render('system/myAdvances.hbs',{
        avances, libro: libros[0], nopagina: ultimaPag[0].nopagina, id
    })
}

controller.addAdvances = async (req, res) => {
    const { id } = req.params
    const { paginasLeidas, comentario } = req.body
    let today = new Date()
    const fechaAvance = today.getDate() + "/" + (today.getMonth() +1) + "/" + today.getFullYear()
    const newAdvance = { fk_usuario: req.user.id, fk_libro: id, fechaAvance, paginasLeidas, comentario}
    try {
        const ultimaPag = await connection.query(`select paginas from userbooks where id = ${id}`)
        if (parseInt(ultimaPag[0].paginas) == parseInt(paginasLeidas)) {
            await connection.query(`update userbooks set status = 'Leído' where id = ${id}`)
            await connection.query('insert into userbooksadvance set ?', [newAdvance])
            req.flash('success_msg', '¡Felicidades! Terminaste de leer el libro')
            res.redirect('/myBooks')
        } else {
            await connection.query('insert into userbooksadvance set ?', [newAdvance])
            req.flash('success_msg', 'Avance agregado con exito')
            res.redirect(`/myAdvances=${id}`)
        }
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error, intentalo de nuevo')
        res.redirect(`/myAdvances=${id}`)
    }
}

module.exports = controller