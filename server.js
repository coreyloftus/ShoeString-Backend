const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const postsController = require('./controllers/postsController')

require('dotenv').config()

const { PORT } = process.env

app.use(cors())
app.use(morgan('dev'))
app.use('/posts', postsController)

app.get('/', (req, res) => { res.redirect('/posts')})

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})