const passport = require("passport")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { Strategy, ExtractJwt } = require("passport-jwt")
const User = require("../models/Users")

const secret = process.env.JWT_SECRET || "shoestring"

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}

const verify = async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id)
        return done(null, user)
    } catch (err) {
        return done(err)
    }
}

const strategy = new Strategy(opts, verify)

passport.use(strategy)

passport.initialize()

const requireToken = passport.authenticate("jwt", { session: false })

const createUserToken = (req, user) => {
    // checks for user + password in req, then valides password
    // creates token using jwt
    if (!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)) {
        const error = new Error("The provided username or password is incorrect")
        error.statusCode = 422
        throw error
    }
    return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 })
}

module.exports = {
    requireToken,
    createUserToken,
}