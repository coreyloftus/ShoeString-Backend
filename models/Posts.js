const mongoose = require("mongoose")


// const TagsSchema = new mongoose.Schema(
//     {
//         title: { type: String },
//     },
//     { timestamps: true }
// )

const PostsSchema = new mongoose.Schema(
    {
        title: { type: String },
        username: { type: String },
        location: [{ type: Number }],
        img: [{ type: String }],
        body: { type: String },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
        likes: { type: Number, default: 0 },
        comments: [{ type: String }],
    },
    { timestamps: true }
)


// const Tags = mongoose.model("Tags", TagsSchema)
const Posts = mongoose.model("Posts", PostsSchema)

module.exports = { Posts }

