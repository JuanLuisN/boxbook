const express = require('express')
const router = express.Router()

const booksController = require('../../controllers/systemControllers/books.controller')
const advancesController = require('../../controllers/systemControllers/advances.controller')

router.get('/myBooks', booksController.renderLibros)
router.post('/addBook', booksController.addBook)
router.post('/switchToReading/:id', booksController.editStatus)
router.post('/addQualification/:id', booksController.addQualification)
router.get('/deleteBook/:id', booksController.deleteBook)

router.get('/myAdvances=:id', advancesController.renderAvances)
router.post('/myAdvances/add/:id', advancesController.addAdvances)

module.exports = router