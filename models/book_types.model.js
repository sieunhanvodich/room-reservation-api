const mongoose = require('mongoose');

const book_typesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('book_types', book_typesSchema);