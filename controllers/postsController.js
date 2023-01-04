const express = require("express")
const { Posts } = require("../models")
const router = express.Router()
router.use(express.json())

// test index route
// http://localhost:4000/posts
router.get("/", async (req, res, next) => {
    try {
        const foundPosts = await Posts.find()
        res.status(200).json({ foundPosts })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

// make it CRUD
// CREATE
router.post("/", async (req, res, next) => {
    try {
        const createPost = await Posts.create(req.body)
        res.status(201).json({ mesage: "created post", createPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// READ
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
