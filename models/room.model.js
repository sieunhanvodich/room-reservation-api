const mongoose = require('mongoose');
const schema = mongoose.Schema;

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

// const schema = new Schema({

// })
// }
module.exports = mongoose.model('room', roomSchema);