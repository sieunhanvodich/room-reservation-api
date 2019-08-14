const BookInfomation = require('../models/book_infos.model');

module.exports = {
    booking: async (req, res) => {
        try {
            const bookInfo = new BookInfomation({
                meeting_name: req.body.meeting_name,
                project_name: req.body.project_name,
                room_id: req.body.room_id,
                from: req.body.from,
                to: req.body.to,
                host_id: req.body.host_id,
                book_type_id: req.body.host_id,
                description: req.body.description,
                invited:req.body.invited,
                until: req.body.until,
                created_at: "8/13/2019 10:15"
                }
            )
            console.log(bookInfo)
        } catch (error) {
            // res.status(400).send(error)
            res.json({ error: "error" })
        }
    }
};