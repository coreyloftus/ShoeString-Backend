const express = require("express")
const { Posts, Tags } = require("../models")
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
        // check req.body to see if user is adding tags to their post
        req.body.tags
            ? // YES -- user is adding a tag
              // Tags.find(req.body.tags) to see if it already exists
              async (req, res, next) => {
                  const foundTag = await Tags.find({ tags: req.body.tags })
                  console.log(foundTag[0]._id)
                  //   res.status(201).json({ message: "created post", createPost, message: "tag exists", foundTag })
              }
            : // if yes
              // grab the Tag._id, store it in a variable
              // make a PUT REQ to change the User's Post Tag from the word itself into the Atlas ID of the tag in the Tag Collection
              //  if no
              //  create the tag
              // Tags.create
              // grab the Tag._id, store it in a variable
              // make a PUT REQ to change the User's Post Tag from the word itself into the Atlas ID of the tag in the Tag Collection
              //   if tag doesn't exist,
              //  do a POST req to create the tag in Tags collection on Atlas
              // then do a PUT req to change the req.body.tags to the Tag._id in Atlas
              async (req, res, next) => {
                  const createTag = await Tags.create(req.body.tags)
                  res.status(201).json({ message: "created post", createPost, message: "new tag", createTag })
              }
        const createPost = await Posts.create(req.body)
        res.status(201).json({ message: "created post", createPost })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
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
