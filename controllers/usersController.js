const express = require("express")
const router = express.Router()
router.use(express.json())
const { Users } = require("../models")

// http://localhost:4000/users
router.get("/", async (req, res, next) => {
    try {
        const allUsers = await Users.find()
        res.status(200).json({ allUsers })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

// CREATE
// http://localhost:4000/users
router.post("/", async (req, res, next) => {
    try {
        const createUser = await Users.create(req.body)
        res.status(201).json({ mesage: "created user", createUser })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// READ
// http://localhost:4000/users
router.get("/:id", async (req, res, next) => {
    try {
        const foundUser = await Users.findById(req.params.id)
        res.status(200).json({ foundUser })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// UPDATE
// http://localhost:4000/users
router.put("/:id", async (req, res, next) => {
    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({ message: "successfully updated", updateUser })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})
// DESTROY
// http://localhost:4000/users
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "successfully deleted", deletedUser })
    } catch (err) {
        res.status(400).json({ error: err })
        return next(err)
    }
})

module.exports = router
