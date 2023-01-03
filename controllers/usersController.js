const express = require("express")
const router = express.Router()
router.use(express.json())

// http://localhost:4000/users
router.get("/", async (req, res, next) => {
    try {
        res.status(200).json({message: "users index route here"})
    } catch(err) {
        res.status(400).json({error:err})
        return next(err)
    }
})

module.exports = router