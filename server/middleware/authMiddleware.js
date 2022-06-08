const User = require('../model/authModel')
const jwt = require('jsonwebtoken')

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(
            token,
            "secret key",
            async (err, decodedToken) => {
                if(err) {
                    res.json({ status: false})
                    next()
                } else {
                    const user = await User.findById(decodedToken.id)
                    if (user) res.json({ status: true, email: user.email, id: user._id, name: user.name, admin: user.admin })
                    else res.json({ status: false })
                    next()
                }
            }
        )
    } else {
        res.json({ status: false})
        next()
    }
}