const express = require("express")
const { Posts } = require("../models")
const router = express.Router()
router.use(express.json())

// test index route
// http://localhost:4000/posts
router.get("/", async (req, res, next) => {
    try {
        res.status(200).json({message: "posts index route here"})
    } catch(err) {
        res.status(400).json({error:err})
        return next(err)
    }
})

// make it CRUD
// CREATE
router.post('/', async (req,res,next) => {
    try {
        const createPost = await Posts.create(req.body)
        res.status(201).json({mesage: "created post", createPost})
    } catch(err) {
        res.status(400).json({error:err})
        return next(err)
    }
})
// READ

// UPDATE

// DESTROY


module.exports = router