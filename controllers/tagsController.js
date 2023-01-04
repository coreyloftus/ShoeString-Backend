const express = require("express")
const router = express.Router()
router.use(express.json())
const { Tags } = require("../models")

// http://localhost:4000/tags
router.get("/", async (req, res, next) => {
    try {
        const allTags = await Tags.find()
        res.status(200).json({ allTags })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

// CREATE
// http://localhost:4000/tags
router.post("/", async (req, res, next) => {
    try {
        const createTag = await Tags.create(req.body)
        res.status(201).json({ mesage: "created tag", createTag })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// READ
// http://localhost:4000/tags/:id
router.get("/:id", async (req, res, next) => {
    try {
        const foundTag = await Tags.findById(req.params.id)
        res.status(200).json({ foundTag })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// UPDATE
// http://localhost:4000/tags/:id
router.put("/:id", async (req, res, next) => {
    try {
        const updateTag = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({ message: "successfully updated", updateTag })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// DESTROY
// http://localhost:4000/tags/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedTag = await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "successfully deleted", deletedTag })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

module.exports = router
