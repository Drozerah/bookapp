const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}/`)
})
