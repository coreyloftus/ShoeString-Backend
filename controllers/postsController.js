const express = require("express")
const Posts = require("../models/Posts")
const Tags = require("../models/Tags")
const router = express.Router()
router.use(express.json())

// index route
// http://localhost:4000/posts
router.get("/", async (req, res, next) => {
    try {
        const allPosts = await Posts.find().populate("tags")
        res.status(200).json({ allPosts })
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
            //     // if user post includes tags, search to see if they exist
            //     let foundTag = await Tags.findOne({ title: req.body.tags })
            //     // if tag does NOT YET exist, create it and assign to req.body.tags
            //     if (foundTag === null) {
            //         const createTag = await Tags.create({ title: req.body.tags })
            //         foundTag = createTag
            //     }
            //     // if tag DOES already exist, grab existing tag's ID and assign it to req.body.tags
            //     // so that way all posts that use this tag reference the same tag
            //     req.body.tags = foundTag._id
            let tagsStrs = req.body.tags
            let tagsIDs = []
            console.log(tagsStrs)
            console.log(tagsStrs.length)
            // if user post includes tags, search to see if they exist
            if (tagsStrs.length > 0) {
                for (i = 0; i < tagsStrs.length; i++) {
                    let foundTag = await Tags.findOne({ title: tagsStrs[i] })
                    // if tag does NOT YET exist, create it and put it into temp arr
                    if (foundTag === null) {
                        const createTag = await Tags.create({ title: tagsStrs[i] })
                        newTag = createTag
                        console.log(`new tag | ${tagsStrs[i]} | created`)
                        tagsIDs.push(newTag._id)
                    } else {
                        console.log(`existing tag | ${tagsStrs[i]} | added`)
                        // if tag DOES already exist, push existing tag's ID into temp arr
                        tagsIDs.push(foundTag._id)
                    }
                    req.body.tags = tagsIDs
                }
            }
            const createPost = await Posts.create(req.body)
            res.json(createPost)
        } catch (err) {
            res.status(400).json({ error: err })
            return next(err)
        }
    } else {
        const createPost = await Posts.create(req.body)
        res.json({ message: "post created", createPost })
    }
})

// READ
// http://localhost:4000/posts/:id
router.get("/:id", async (req, res, next) => {
    try {
        const foundPost = await Posts.findById(req.params.id).populate("tags")
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
        let tagsStrs = req.body.tags
        let tagsIDs = []
        console.log(tagsStrs)
        console.log(tagsStrs.length)
        // if user post includes tags, search to see if they exist
        if (tagsStrs.length > 0) {
            for (i = 0; i < tagsStrs.length; i++) {
                let foundTag = await Tags.findOne({ title: tagsStrs[i] })
                // if tag does NOT YET exist, create it and put it into temp arr
                if (foundTag === null) {
                    const createTag = await Tags.create({ title: tagsStrs[i] })
                    newTag = createTag
                    tagsIDs.push(newTag._id)
                } else {
                    // if tag DOES already exist, push existing tag's ID into temp arr
                    tagsIDs.push(foundTag._id)
                }
                req.body.tags = tagsIDs
            }
        }
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
