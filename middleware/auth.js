
// ////////////////////////
// // dependencies
// ////////////////////////
// const passport = require("passport")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const { Strategy, ExtractJwt } = require("passport-jwt")
// const Users = require("../models/Users")

// ////////////////////////
// // config
// ////////////////////////
// const secret = process.env.JWT_SECRET
// // minimum options for passport-jwt
// console.log(secret)
// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: secret,
// }
// ////////////////////////
// // authentication functionality
// ////////////////////////
// const verify = async (jwt_payload, done) => {
//     try {
//         const user = await Users.findById(jwt_payload.id)
//         return done(null, user)
//     } catch (err) {
//         return done(err)
//     }
// }
// const strategy = new Strategy(opts, verify)
// passport.use(strategy)
// passport.initialize()
// const requireToken = passport.authenticate("jwt", { session: false })
// const createUserToken = (req, user) => {
//     if (!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)) {
//         const err = new Error("Username or password incorrect")
//         err.status = 401
//         throw err
//     }
//     return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 })
// }
// module.exports = {
//     requireToken,
//     createUserToken,
// }

