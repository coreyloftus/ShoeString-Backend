const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
let PORT = 4000

require('dotenv').config()

app.use(cors())
app.use(morgan('dev'))

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})