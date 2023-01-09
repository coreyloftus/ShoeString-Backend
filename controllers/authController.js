const express = require("express")
const Users = require("../models/Users")
const bcrypt = require("bcrypt")
const router = express.Router()
const { createUserToken, requireToken } = require("../middleware/auth")

router.post("/register", async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send("Email and password is required")
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        const pwStore = req.body.password
        req.body.password = passwordHash
        const newUser = await Users.create(req.body)
        if (newUser) {
            req.body.password = pwStore
            const authenticatedUserToken = createUserToken(req, newUser)
            res.status(201).json({
                username: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken,
            })
        } else {
            res.status(400).json({ error: "Something went wrong" })
        }
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.post("/login", async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send("Email and password is required")
        }
        const loggingUser = req.body.username
        const foundUser = await Users.findOne({ username: loggingUser })
        const token = await createUserToken(req, foundUser)
        res.status(200).json({
            username: foundUser,
            isLoggedIn: true,
            token,
        })
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
})

router.get("/logout", requireToken, async (req, res, next) => {
    try {
        const currentUser = req.user.username
        delete req.user
        res.status(200).json({
            message: `${currentUser} currently logged out`,
            isLoggedIn: false,
            token: "",
        })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router
