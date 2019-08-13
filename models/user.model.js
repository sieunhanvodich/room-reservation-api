const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        // match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    phone: {
        type: String,
        match: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    console.log(email)
    const user = await userSchema.find({ email: email} )
    console.log(user)
    // if (!user) {
    //     throw new Error({ error: 'Invalid login credentials' })
    // }
    // const isPasswordMatch = await bcrypt.compare(password, user.password)
    // if (!isPasswordMatch) {
    //     throw new Error({ error: 'Invalid login credentials' })
    // }
    return user
}

module.exports = mongoose.model('user', userSchema);