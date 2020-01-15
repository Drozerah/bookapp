// MODULES
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
// MODELS
const Book = require('../models/book')
const Author = require('../models/author')
// UPLOADING FILES
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

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
  renderNewPage(res, new Book())
})

// * POST New Books API endpoint
// @description         create new books POST endpoint
// @method              Model.save()
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description
  })
  try {
    // eslint-disable-next-line no-unused-vars
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect('books')
  } catch (error) {
    // remove image file if error
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName)
    }
    console.log(`mongoose err ${error}`) // ! DEV
    // TODO use error message from moongose model
    renderNewPage(res, book, true)
  }
})
/**
 * Remove book file from ./public/uploads/bookCovers folder
 *
 * @param  {String} fileName the file name to remove
 * @returns {String} print error/success message to console
 */
function removeBookCover (fileName) {
  fs.unlink(path.join(uploadPath, fileName), err => {
    if (err) {
      console.err(err)
    } else {
      const msg = `the file ${fileName} has been successfully removed!`
      console.info(msg)
    }
  })
}
/**
 * Rendering or redirecting to specific route according to boolean
 *
 * @async
 * @param  {Object} res the scopped response object
 * @param  {Object} book the book object
 * @param  {Boolean} [hasError = false] - default boolean is false
 * @returns {Promise} render a page or make redirection
 */
async function renderNewPage (res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors,
      book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch (error) {
    res.redirect('/books')
  }
}

module.exports = router
