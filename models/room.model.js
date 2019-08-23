const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
        type: String,
    },
    created_at: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('room', roomSchema);