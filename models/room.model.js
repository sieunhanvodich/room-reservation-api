const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true
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