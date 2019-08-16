const Room = require('../models/room.model')

module.exports = {
    listRooms: async (req, res) => {
        try {
            await Room.find({}, function(err, rooms) {
                res.send(rooms)
              })
        } catch (error) {
            // res.status(400).send(error)
            res.json(error.message)
        }
    }
}