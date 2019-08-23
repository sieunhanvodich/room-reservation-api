const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const book_infosSchema = new mongoose.Schema({
    host_id: {
        type: ObjectId,
        required: true,
    },
    book_type_id: {
        type: ObjectId,
        required: true,
    },
    meeting_name: {
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
    until : {
        type: Date,
        required: true
    },
    room_id: {
        type: ObjectId,
        required: true,
        ref: 'room'
    }
    
});

module.exports = mongoose.model('book_infos', book_infosSchema);