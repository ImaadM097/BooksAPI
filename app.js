const express = require('express')
const app = express()
const booksRouter = require('./books')


app.use(express.json())

app.use('/api', booksRouter)

app.listen(3000)







