const express = require("express")
const Posts = require("../models/Posts")
const Tags = require("../models/Tags")
const router = express.Router()
router.use(express.json())

// const { handleValidateOwnership, requireToken } = require("../middleware/auth")

// index route
// http://localhost:4000/posts
router.get("/", async (req, res, next) => {
    try {
        // const allPosts = await Posts.find().populate("tags").populate("owner")
        const allPosts = await Posts.find().populate("tags")
        res.status(200).json({ allPosts })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

// make it CRUD
// CREATE
// token must be in the POST request header as {Authorization: Bearer (token here with no parenthesis or quotes)}
// router.post("/", requireToken, async (req, res, next) => {
router.post("/", async (req, res, next) => {
    if (req.body.tags) {
        try {
            // const owner = req.user._id
            // req.body.owner = owner
            // if user post includes tags, search to see if they exist
            let foundTag = await Tags.findOne({ title: req.body.tags })
            // if tag does NOT YET exist, create it and assign to req.body.tags
            if (foundTag === null) {
                const createTag = await Tags.create({ title: req.body.tags })
                foundTag = createTag
            }
            // if tag DOES already exist, grab existing tag's ID and assign it to req.body.tags
            // so that way all posts that use this tag reference the same tag
            req.body.tags = foundTag._id
            const createPost = await Posts.create(req.body)
            res.json(createPost)
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
        // const foundPost = await Posts.findById(req.params.id).populate("tags").populate("owner")
        const foundPost = await Posts.findById(req.params.id).populate("tags")
        res.status(200).json({ foundPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// UPDATE
// http://localhost:4000/posts/:id
// router.put("/:id", requireToken, async (req, res, next) => {
router.put("/:id", async (req, res, next) => {
    try {
        // handleValidateOwnership(req, await Posts.findByIdAndUpdate(req.params.id))
        // if user post includes tags, search to see if they exist
        let foundTag = await Tags.findOne({ title: req.body.tags })
        // if tag does NOT YET exist, create it and assign to req.body.tags
        if (foundTag === null) {
            const createTag = await Tags.create({ title: req.body.tags })
            foundTag = createTag
        }
        // if tag DOES already exist, grab existing tag's ID and assign it to req.body.tags
        // so that way all posts that use this tag reference the same tag
        req.body.tags = foundTag._id
        const updatePost = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({ message: "successfully updated", updatePost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// DESTROY
// http://localhost:4000/posts/:id
// removed requiretoken to get us to MVP
// router.delete("/:id", requireToken, async (req, res, next) => {
router.delete("/:id", async (req, res, next) => {
    try {
        // handleValidateOwnership(req, await Posts.findById(req.params.id))
        const deletedPost = await Posts.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "successfully deleted", deletedPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

module.exports = router
