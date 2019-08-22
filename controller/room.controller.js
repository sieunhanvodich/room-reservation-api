const Room = require('../models/room.model')

module.exports = {
    listRooms: (req, res) => {
        try {
            Room.find({}, function(err, rooms) {
                res.send(rooms)
              })
        } catch (error) {
            // res.status(400).send(error)
            res.json(error.message)
        }
    }
}