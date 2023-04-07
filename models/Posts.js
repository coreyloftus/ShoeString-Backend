const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema(
    {
        username: { type: String },
        owner: { type: String },
        location: [{ type: Number, index: "2dsphere" }],
        img: [{ type: String }],
        body: { type: String },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
        likes: { type: Number, default: 0 },
        comments: [{ type: String }],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Posts", PostsSchema)
