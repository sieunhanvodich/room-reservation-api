const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const book_infosSchema = new mongoose.Schema({
    room_id: {
        type: ObjectId,
        required: true,
    },
    host_id: {
        type: ObjectId,
        required: true,
    },
    book_type_id: {
        type: ObjectId,
        required: true,
    },
    // department_id:{
    //     type: ObjectId,
    //     required: true,
    // },
    meeting_name: {
        type: String,
        required: true,
        trim: true,
    },
    project_name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    invited: {
        type: Array,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    until: {
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