const exhbs = require('express-handlebars')
const connection = require('../database')

let hbs = exhbs.create({})

hbs.handlebars.registerHelper('estaPendiente', (status) => {
    return status == 'Pendiente' ? true : false
})

hbs.handlebars.registerHelper('estaLeyendo', (status, puntaje) => {
    return status == 'Leyendo' ? true : false
})

hbs.handlebars.registerHelper('estaCalificado', (puntaje) => {
    return puntaje == 0 ? true : false
})

hbs.handlebars.registerHelper('estaLeido', (status) => {
    return status == 'Leído' ? true : false
})

hbs.handlebars.registerHelper('qualification', (qualification) => {
    if (qualification === 1) {
        return "Muy baja"
    }
    if (qualification === 2) {
        return "Baja"
    }
    if (qualification === 3) {
        return "Media"
    }
    if (qualification === 4) {
        return "Alta"
    }
    if (qualification === 5) {
        return "Muy alta"
    }    
})

hbs.handlebars.registerHelper('isCompleteBook', (avance, paginas) => {
    console.log(avance)
    return avance != paginas ? true : false 
})

hbs.handlebars.registerHelper('hasGoal', (objetivo) => {
    return objetivo > 0 ? true : false
})

hbs.handlebars.registerHelper('enviada', (estado) => {
    return estado == 'enviada' ? true : false
})

hbs.handlebars.registerHelper('pendiente', (estado) => {
    return estado == 'pendiente' ? true : false
})

hbs.handlebars.registerHelper('amigos', (estado) => {
    return estado == 'amigos' ? true : false
})