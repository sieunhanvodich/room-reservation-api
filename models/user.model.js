const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Types.ObjectId
const SECRET_KEY = 'asterix-needs-permit-a-38';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type: ObjectId,
        required: true,
        trim: true,
        ref: 'role'
    },
    department_id:{
        type: ObjectId,
        required: true,
        trim: true,
        ref: 'department'
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
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
    }
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

userSchema.statics.hashhhh = bcrypt.hash('1234567', 10).then(function (hash) {
    // Store hash in your password DB.
});

userSchema.methods.generateAuthToken = function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, SECRET_KEY /*, process.env.JWT_KEY */)
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email: email }).exec()
    if (!user) {
        throw new Error('Invalid user!')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid user or password!')
    }
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User