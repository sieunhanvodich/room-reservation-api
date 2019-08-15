const room = require('../models/room.model');

module.exports = {
    getRoomList: (req, res, next) => {

        room.find({}, function (err, rooms) {
            // let info = rooms.map(room => ({
                
            //     name: room.name,
            //     position: room.position,
            //     capacity: room.capacity,
            //     description: room.description
            // }))
            res.json({rooms});
        })
    }
};