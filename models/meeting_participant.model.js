const mongoose = require('mongoose');

const meeting_participantSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    meeting_id: {
        type: String,
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

module.exports = mongoose.model('meeting_participant', meeting_participantSchema);