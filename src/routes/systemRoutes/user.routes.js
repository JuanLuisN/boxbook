const express = require('express')
const router = express.Router()

const booksController = require('../../controllers/systemControllers/books.controller')
const advancesController = require('../../controllers/systemControllers/advances.controller')
const myFriendsController = require('../../controllers/systemControllers/friends.controller')

router.get('/myBooks', booksController.renderLibros)
router.post('/addBook', booksController.addBook)
router.post('/switchToReading/:id', booksController.editStatus)
router.post('/addQualification/:id', booksController.addQualification)
router.get('/deleteBook/:id', booksController.deleteBook)

router.get('/myAdvances=:id', advancesController.renderAvances)
router.post('/myAdvances/add/:id', advancesController.addAdvances)

router.post('/addObjetivo', booksController.addObjetivo)

router.get('/myFriends', myFriendsController.renderFriends)
router.get('/sendRequest/:id', myFriendsController.addFriend)
router.get('/acceptRequest', myFriendsController.acceptRequest)
router.get('/deleteFriend', myFriendsController.deleteFriend)
router.get('/friendProfile=:id', myFriendsController.renderProfileFriend)
router.get('/friendAdvances=:id', myFriendsController.renderFriendAdvances)

module.exports = router