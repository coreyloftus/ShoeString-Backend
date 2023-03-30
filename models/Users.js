const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema(
    {
        name: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        location: { type: [String, String] },
        comments: { type: [String] },
        tags: { type: [String] },
    },
    {
        timestamps: true,
        id: false,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password
                return ret
            },
        },
    }
)
module.exports = mongoose.model("Users", UsersSchema)
