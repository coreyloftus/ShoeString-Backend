const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const postsController = require("./controllers/postsController")
const usersController = require("./controllers/usersController")
const tagsController = require("./controllers/tagsController")
const authController = require("./controllers/authController")

require("dotenv").config()
require("./config/db.connection")

const { PORT } = process.env || 4000

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(morgan("dev"))

app.use("/posts", postsController)
app.use("/users", usersController)
app.use("/tags", tagsController)
app.use("/auth", authController)

app.get("/posts", (req, res) => {
    res.redirect("/posts")
})
app.get("/users", (req, res) => {
    res.redirect("/users")
})
app.get("/tags", (req, res) => {
    res.redirect("/tags")
})
app.get("/", (req, res) => {
    res.redirect("/posts")
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
