const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

connectDB()

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`[APP-MODE] ${app.get('env')}`)
  console.log(`[APP-URL] http://localhost:${port}`)
})
