const express = require('express')
const router = express.Router()

// All Authors Routes
// @description         GET all authors
// methods
router.get('/', (req, res) => {
  res.render('authors/index')
})

// New Author Route
// @description         create new author with a form
router.get('/new', (req, res) => {
  res.render('authors/new')
})

// Create New Author API endpoint
// @description         create new author endpoint
router.post('/', (req, res) => {
  res.send('Create')
})

module.exports = router
