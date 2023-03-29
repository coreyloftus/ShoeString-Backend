const mongoose = require("mongoose")

// const TagsSchema = new mongoose.Schema(
//     {
//         title: { type: String },
//     },
//     { timestamps: true }
// )
const PostsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        location: [{ type: Number }],
        images: [{ type: String }],
        body: { type: String, required: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
)

// const Tags = mongoose.model("Tags", TagsSchema)
const Posts = mongoose.model("Posts", PostsSchema)

module.exports = { Posts }
