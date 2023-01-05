const mongoose = require("mongoose")

const TagsSchema = new mongoose.Schema(
    {
        title: { type: String },
    },
    { timestamps: true }
)
const PostsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        username: { type: String, required: true },
        location: [{ type: Number }],
        img: [{ type: String }],
        body: { type: String, required: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
        likes: { type: Number, default: 0 },
        comments: [{ type: String }],
    },
    { timestamps: true }
)

const Tags = mongoose.model("Tags", TagsSchema)
const Posts = mongoose.model("Posts", PostsSchema)

module.exports = { Posts, Tags }
