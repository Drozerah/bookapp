const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
  let books
  try {
    // sort results by date, the last record at first position
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch (error) {
    console.log(`err ${error}`) // ! DEV
    books = []
  }
  res.render('index', {
    books: books
  })
})

module.exports = router
