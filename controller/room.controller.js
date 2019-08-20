const roomModel = require('../models/room.model');
const bookInfo = require('../models/book_infos.model');
const bookType = require('../models/book_types.model')
module.exports = {
    getRoomList: async (req, res, next) => {
        let roomList = await roomModel.find({});
        
        let bookInfos = await bookInfo.find({});
        console.log(bookInfos)
        
        let bookTypeName = [];
        for (let i = 0; i < bookInfos.length; i++) {
            
            let bookTypeId =  await bookInfos[i].book_type_id;
            let mid = await  bookType.findById(bookTypeId)  
            bookTypeName.push(mid.name)
               
         }
       console.log(bookTypeName)
   
        res.json({
            roomList: roomList,
            bookInfos: bookInfos,
            bookTypeName: bookTypeName
        })
    
   },   
}


