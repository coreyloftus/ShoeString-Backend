const mongoose = require("mongoose")

const TagsSchema = new mongoose.Schema(
    {
        title: { type: String },
    },
    { timestamps: true }
)

const Tags = mongoose.model("Tags", TagsSchema)

module.exports = Tags

