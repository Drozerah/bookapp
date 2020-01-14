const express = require('express')
const router = express.Router()
// MODEL
const Author = require('../models/author')

// * GET All Authors Route
// @description         show all authors
// methods
router.get('/', (req, res) => {
  res.render('authors/index')
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
router.post('/', (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  // save newAuthor to DB
  author.save((err, newAuthor) => {
    if (err) {
      // console.log(`err ${err}`) // ! DEV
      // TODO use error message from moongose model
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    } else {
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect('authors')
    }
  })
})

module.exports = router
