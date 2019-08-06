const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    capacity: {
        type: String
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('room', roomSchema);