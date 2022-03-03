const connection = require('../../database')

controller = {}

controller.renderFriends = async (req, res) => {
    const amigos = await connection.query(`select * from usuarios u, friendship f WHERE f.primer_user_id = ${req.user.id} AND f.segundo_user_id = u.id`)
    const usuarios = await connection.query(`select * from usuarios where id != ${req.user.id}`)
    res.render('system/myFriends', {
        usuarios, amigos
    })
}

controller.addFriend = async (req, res) => {
    const { id } = req.params
    const amistad = await connection.query(`select count(*) as registros from friendship where primer_user_id = ${req.user.id} and segundo_user_id = ${id}`)
    if(amistad[0].registros > 0){
        req.flash('error_msg', 'A este usuario ya se le ha enviado la solicitud de amistad')
        res.redirect('/myFriends')
    } else{
        try {
            await connection.query(
                `insert into friendship (primer_user_id, segundo_user_id, status) values (${req.user.id}, ${id}, 'enviada'), (${id}, ${req.user.id}, 'pendiente');`)
            req.flash('success_msg', 'Se ha enviado la solicitud de amistad')
            res.redirect('/myFriends')
        } catch (e) {
            console.log(e)
            req.flash('error_msg', 'Hubo un error. Intentalo de nuevo')
            res.redirect('/myFriends')
        }
    }
}

controller.acceptRequest = async (req, res) => {
    try {
        await connection.query(`update friendship set status = 'amigos' where primer_user_id = ${req.user.id}`)
        await connection.query(`update friendship set status = 'amigos' where segundo_user_id = ${req.user.id}`)
        req.flash('success_msg', 'Se acepto la solicitud correctamente')
        res.redirect('/myFriends')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error. Intentalo de nuevo')
        res.redirect('/myFriends')
    }
}

controller.deleteFriend = async (req, res) => {
    try {
        await connection.query(`delete from friendship where primer_user_id = ${req.user.id}`)
        await connection.query(`delete from friendship where segundo_user_id = ${req.user.id}`)
        req.flash('success_msg', 'Se elimino exitosamente al amigo')
        res.redirect('/myFriends')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Hubo un error. Intentalo de nuevo')
        res.redirect('/myFriends')
    }
}

controller.renderProfileFriend = async (req, res) => {
    const { id } = req.params
    const profile = await connection.query(`select nombreCompleto from usuarios where id = ${id}`)
    const libros = await connection.query(`select * from userbooks where fk_usuario = ${id} order by id DESC`)
    res.render('system/friendProfile',{
        libros, amigo: profile[0].nombreCompleto
    })
}

controller.renderFriendAdvances = async (req, res) => {
    const { id } = req.params
    const avances = await connection.query(`select * from userbooksadvance where fk_libro = ${id} and fk_usuario = ${req.user.id}`)
    const ultimaPag = await connection.query(`select MAX(paginasLeidas) as nopagina from userbooksadvance where fk_libro = ${id} and fk_usuario = ${req.user.id}`)
    const libros = await connection.query(`select autor, titulo, paginas, imagen from userbooks where id = ${id}`)
    res.render('system/friendAdvances',{
        avances, libro: libros[0], nopagina: ultimaPag[0].nopagina, id
    })
}

module.exports = controller