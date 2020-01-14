const express = require('express')
const router = express.Router()
// MODEL
const Author = require('../models/author')

// * GET All Authors Route
// @description         show all authors
// methods              rendering ./views/authors/index.ejs view
router.get('/', async (req, res) => {
  const searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors,
      searchOptions: req.query.name
    })
  } catch (error) {
    console.log(`err ${error}`) // ! DEV
    res.redirect('/')
  }
})

// * GET New Author form
// @description         create a new author with a form in the front-end
// @method              rendering ./views/authors/new.ejs view
router.get('/new', (req, res) => {
  res.render('authors/new', {
    author: new Author()
  })
})

// * POST New Author API endpoint
// @description         create new author endpoint
// @method              Model.save()
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    // eslint-disable-next-line no-unused-vars
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect('authors')
  } catch (error) {
    console.log(`err ${error}`) // ! DEV
    // TODO use error message from moongose model
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})

module.exports = router
