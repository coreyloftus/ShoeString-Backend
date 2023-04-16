const express = require("express")
const Posts = require("../models/Posts")
const Tags = require("../models/Tags")
const router = express.Router()
router.use(express.json())

const admin = require("../config/firebase")

// index route
// http://localhost:4000/posts
router.get("/", async (req, res, next) => {
    try {
        const idToken = req.header("Authorization").split(" ")[1]
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const uid = decodedToken.uid
        const userRecord = await admin.auth().getUser(uid)
        console.log("Successfully fetched user data:", userRecord.toJSON())
        const allPosts = await Posts.find().populate("tags")
        res.status(200).json({ allPosts })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

// make it CRUD
// CREATE

const createTagsIfNotExist = async (tagsStrs) => {
    let tagsIDs = []
    // if user post includes tags, search to see if they exist
    for (let i = 0; i < tagsStrs.length; i++) {
        let foundTag = await Tags.findOne({ title: tagsStrs[i] })
        if (foundTag === null) {
            const createTag = await Tags.create({ title: tagsStrs[i] })
            newTag = createTag
            tagsIDs.push(newTag._id)
        } else {
            tagsIDs.push(foundTag._id)
        }
    }
    return tagsIDs
}

router.post("/", async (req, res, next) => {
    try {
        const idToken = req.header("Authorization").split(" ")[1]
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const uid = decodedToken.uid
        const userRecord = await admin.auth().getUser(uid)
        if (req.body.tags) {
            const tagsIds = await createTagsIfNotExist(req.body.tags)
            req.body.tags = tagsIds
        }
        req.body.owner = uid
        req.body.username = userRecord.displayName
        const createPost = await Posts.create(req.body)
        res.status(200).json({ message: "post created", createPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
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
        // if user post includes tags, search to see if they exist
        if (tagsStrs && tagsStrs.length > 0) {
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
