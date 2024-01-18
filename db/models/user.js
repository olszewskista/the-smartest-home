const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['parent', 'child']
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

userSchema.statics.login = async function(name, password) {
    const user = await this.findOne({name})
    if (!user) {
        throw new Error('Incorrect name!')
    }

    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
        return user
    }

    throw new Error('Incorrect password!')
}

const user = mongoose.model('user', userSchema)

module.exports = user