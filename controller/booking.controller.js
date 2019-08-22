const BookInfomation = require('../models/book_infos.model');
const MeetingParticipant = require('../models/meeting_participant.model');
const Room = require('../models/room.model')
const BookType = require('../models/book_types.model')
const Department = require('../models/department.model')


function saveMeetingParticipant(participant, meeting_id) {
    const meetingParticipant = new MeetingParticipant({
        "user_id": participant,
        "meeting_id": meeting_id,
        "updated_at": null,
        "created_at": new Date()
    })
    meetingParticipant.save()
}

module.exports = {
    booking: async (req, res) => {
        const room_id = await Room.findOne({ name: req.body.room_selected });
        const department_id = await Department.findOne({ name: req.body.department_selected })
        const book_type_id = await BookType.findOne({ name: req.body.bookType })
        const bookInfo = new BookInfomation({
            meeting_name: req.body.meeting_name,
            project_name: req.body.project_name,
            room_id: room_id._id,
            // department_id: department_id._id,
            from: req.body.from,
            to: req.body.to,
            host_id: req.body.host_id,
            book_type_id: book_type_id._id,
            description: req.body.description,
            invited: req.body.invited,
            until: req.body.until,
            created_at: new Date(),
            updated_at: null
        }
        )
        try {
            bookInfo.save(async (err, book) => {
                if (err) throw err
                await req.body.invited.map((participant) => saveMeetingParticipant(participant, book._id))
                res.json({ message: "Success" })
            })
            
        } catch(err){
            res.json({ message: "Error" })
        }
    },
};