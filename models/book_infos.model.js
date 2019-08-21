const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
const book_infosSchema = new mongoose.Schema({
    room_id: {
        type: ObjectId,
        required: true,
        ref: 'room'
    },
    host_id: {
        type: ObjectId,
        required: true,
    },
    book_type_id: {
        type: ObjectId,
        required: true,
    },
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
    },
    until : {
        type: Date,
        required: true
    } 
    
});

module.exports = mongoose.model('book_infos', book_infosSchema);