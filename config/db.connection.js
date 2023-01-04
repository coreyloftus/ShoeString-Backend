const mongoose = require('mongoose')
const {MONGODB_URL} = process.env

mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URL)

mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error));