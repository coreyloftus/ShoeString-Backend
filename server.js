const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")

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

app.use("/api/posts", postsController)
app.use("/api/users", usersController)
app.use("/api/tags", tagsController)
app.use("/api/auth", authController)

app.get("/posts", (req, res) => {
    res.redirect("/api/posts")
})
app.get("/users", (req, res) => {
    res.redirect("/api/users")
})
app.get("/tags", (req, res) => {
    res.redirect("/api/tags")
})
app.get("/", (req, res) => {
    res.redirect("/api/posts")
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
