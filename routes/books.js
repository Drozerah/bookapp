const express = require('express')
const router = express.Router()
// MODEL
const Book = require('../models/book')

// * GET All Books Route
// @description         show all books
// methods              rendering ./views/books/index.ejs view
router.get('/', async (req, res) => {
  res.send('All Books')
})

// * GET New Books form
// @description         create a new book with a form in the front-end
// @method              rendering ./views/books/new.ejs view
router.get('/new', (req, res) => {
  res.send('New Book')
})

// * POST New Books API endpoint
// @description         create new books POST endpoint
// @method              Model.save()
router.post('/', async (req, res) => {
  res.send('Create Book')
})

module.exports = router
