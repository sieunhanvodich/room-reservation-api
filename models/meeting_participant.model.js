const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectID;

const meeting_participantSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    meeting_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'book_infos'
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('meeting_participant', meeting_participantSchema);