const mongoose = require('mongoose')

// Creat authors db collection
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Author', authorSchema)
