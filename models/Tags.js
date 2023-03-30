const mongoose = require("mongoose")

const TagsSchema = new mongoose.Schema(
    {
        title: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Tags", TagsSchema)
