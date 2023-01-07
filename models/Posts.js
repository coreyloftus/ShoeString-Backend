const mongoose = require("mongoose")

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
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Posts", PostsSchema)
