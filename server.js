const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

const postsController = require("./controllers/postsController")
const usersController = require("./controllers/usersController")
const tagsController = require("./controllers/tagsController")
const authController = require("./controllers/authController")

require("dotenv").config()
require("./config/db.connection")

const { PORT } = process.env || 4000

app.use(cors())
app.use(morgan("dev"))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
})
app.use("/posts", postsController)
app.use("/users", usersController)
app.use("/tags", tagsController)
app.use("/auth", authController)

// res.redirect("/posts")
app.get("/posts", (req, res) => {
    request({ url: "https://shoe-string.herokuapp.com/posts" }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: "error", message: err.message })
        }
        res.json(JSON.parse(body))
    })
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
