const express = require("express")
const { Posts, Tags } = require("../models/Posts")
const router = express.Router()
router.use(express.json())

// test index route
// http://localhost:4000/posts
router.get("/", async (req, res, next) => {
    try {
        const foundPosts = await Posts.find().populate("tags")
        res.status(200).json({ foundPosts })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

// make it CRUD
// CREATE
router.post("/", async (req, res, next) => {
    if (req.body.tags) {
        try {
            console.log(req.body.tags)
            const foundTag = await Tags.findOne({ title: req.body.tags })
            req.body.tags = foundTag._id
            const createPost = await Posts.create(req.body)
            res.json(createPost)
            //  () => {
            //       console.log("tag not in db")
            //       res.json({ message: "tag not found" })
            //   }
        } catch (err) {
            res.status(400).json({ error: err })
            return next(err)
        }
    } else {
        const createPost = await Posts.create(req.body)
        res.json({ message: "no tags in message", createPost })
    }
})

// READ
// http://localhost:4000/posts/:id
router.get("/:id", async (req, res, next) => {
    try {
        const foundPost = await Posts.findById(req.params.id)
        res.status(200).json({ foundPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// UPDATE
// http://localhost:4000/posts/:id
router.put("/:id", async (req, res, next) => {
    try {
        const updatePost = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({ message: "successfully updated", updatePost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// DESTROY
// http://localhost:4000/posts/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "successfully deleted", deletedPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

module.exports = router
