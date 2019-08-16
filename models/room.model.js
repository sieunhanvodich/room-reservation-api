const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,     
    },
    image: {
        type: String,
    },
    position: {
        type: String,
    },
    capacity: {
        type: String,
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('rooms', roomSchema);