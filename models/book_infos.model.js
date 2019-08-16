const mongoose = require('mongoose');

const book_infosSchema = new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    host_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    book_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    // book_type: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'book_types'
    // },

    name: {
        type: String,
        required: true,
        trim: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('book_infos', book_infosSchema);