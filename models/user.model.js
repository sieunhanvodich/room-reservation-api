const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    id_department: {
        type: ObjectId,
        required: true,
    },
    id_roles: {
        type: ObjectId,
        required: true,
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
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
    },
});

module.exports = mongoose.model('user', userSchema);