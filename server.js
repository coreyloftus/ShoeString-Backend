const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

const postsController = require("./controllers/postsController")
const usersController = require("./controllers/usersController")
const tagsController = require("./controllers/tagsController")

require("dotenv").config()
require("./config/db.connection")

const { PORT } = process.env || 4000

app.use(cors())
app.use(morgan("dev"))
app.use("/posts", postsController)
app.use("/users", usersController)
app.use("/tags", tagsController)

app.get("/posts", (req, res) => {
    res.redirect("/posts")
})
app.get("/users", (req, res) => {
    res.redirect("/users")
})
app.get("/tags", (req, res) => {
    res.redirect("/tags")
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
