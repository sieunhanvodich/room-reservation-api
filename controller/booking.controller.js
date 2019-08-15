const book_infos = require('../models/book_infos.model');
const participant = require('../models/meeting_participant.model');

module.exports = {
    booking: (req, res) => res.send("This page use for booking room"),
    deleteBooking: (req, res) => {
        let meetingId = req.body.meetingId;
        console.log(meetingId);
        book_infos.findOneAndRemove({_id: meetingId}, (err) => {
            if (err) throw new Error('delete not done');
            participant.remove({meeting_id: meetingId}, (err) => {
                if (err) res.json({status: 'delete not done'});
                res.json({status: 'delete done'});
            })
        })
    }
};