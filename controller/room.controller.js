const roomModel = require('../models/room.model');
const bookInfo = require('../models/book_infos.model');
const bookType = require('../models/book_types.model')
module.exports = {
    getRoomList: async (req, res, next) => {
        
        let bookInfos = await bookInfo.find({}).populate('book_type_id').populate('room_id');
        console.log(bookInfos)
   
        res.json({
            
             bookInfos: bookInfos,
            
        })
    
   },   
}


