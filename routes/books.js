const express = require('express')
const router = express.Router()
// MODELS
const Book = require('../models/book')
const Author = require('../models/author')

// * GET All Books Route
// @description         show all books
// methods              rendering ./views/books/index.ejs view
router.get('/', async (req, res) => {
  res.send('All Books')
})

// * GET New Books form
// @description         create a new book with a form in the front-end
// @method              rendering ./views/books/new.ejs view
// @redirection         ./books all books page
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find({})
    const book = new Book()
    res.render('books/new', {
      authors,
      book
    })
  } catch (error) {
    res.redirect('/books')
  }
})

// * POST New Books API endpoint
// @description         create new books POST endpoint
// @method              Model.save()
router.post('/', async (req, res) => {
  res.send('Create Book')
})

module.exports = router
