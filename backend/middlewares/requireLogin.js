const jwt = require("jsonwebtoken")
const dotenv = require(`dotenv`);
const mongoose = require("mongoose")
const USER = mongoose.model("USER")

dotenv.config({ path: './.env' });

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must have logged in 1" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must have logged in 2" })
        }
        const { _id } = payload
        USER.findById(_id).then(userData => {
            req.user = userData
            next()
        })
    })

}