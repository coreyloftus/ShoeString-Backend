const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        body: { type: String, required: true },
        tags: { type: [String] },
    },
    { timestamps: true }
)
const Posts = mongoose.model("Posts", PostsSchema)
module.exports = Posts
