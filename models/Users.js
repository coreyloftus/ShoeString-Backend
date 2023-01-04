const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String },
    location: { type: [String, String] },
    comments: { type: [String] },
    tags: { type: [String] },
})
const Users = mongoose.model("Users", UsersSchema)
module.exports = Users
