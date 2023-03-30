const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-3-2b8a3.firebaseio.com",
})
async function decodeIDToken(req, res, next) {
    const header = req.headers?.authorization
    if (header !== "Bearer null" && req.headers?.authorization?.startsWith("Bearer")) {
        const idToken = req.headers?.authorization.split("Bearer")[1]
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            req["currentUser"] = decodedToken
        } catch (err) {
            console.error(err)
        }
    }
    next()
}
module.exports = decodeIDToken
