const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Kérem adja meg Email címét!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Kérem adja meg jelszavát!"]
    },
    name: {
        type: String,
        required: [true, "Kérem adja meg teljes nevét!"]
    },
    phone: {
        type: String,
        required: [true, "Kérem adja meg telefonszámát!"]
    },
    admin: {
        type: Boolean,
        required: false,
    }
})

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        }
        throw Error("Incorrect password")
    }
    throw Error("incorrect email")
}

module.exports = mongoose.model("Users", userSchema)