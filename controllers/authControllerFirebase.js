const express = require("express")
const router = express.Router()
const {db, app} = require("../firebase/config")
// const app = require("../firebase/config")

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)

        await db.collection("users").doc(userCredential.user.uid).set({
            email,
            displayName: "",
            photoURL: "",
        })
        res.status(200).json({ message: "user created" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

router.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                res.status(200).json({ user })
            })
            .catch((err) => {
                res.status(400).json({ err: err.message })
            })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.get("/logout", async (req, res) => {
    try {
        firebase.auth().signOut()
        res.status(200).json({ message: "user logged out" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})
module.exports = router
