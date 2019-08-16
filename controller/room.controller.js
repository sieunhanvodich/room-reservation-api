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
    // let bookInfos = bookInfo.find({}).populate('book_type').exec(function(error, posts) {
    //         console.log('post', JSON.stringify(posts, null, "\t"))
    //     });
        res.json({
            roomList: roomList,
            bookInfos: bookInfos,
            bookTypeName: bookTypeName
        })
    //     room.find({}, function (err, rooms) {
    //         let info = rooms.map(room => ({

    //             name: room.name,
    //             position: room.position,
    //             capacity: room.capacity,
    //             description: room.description
    //         }))
            
    //         res.json({ rooms });
    //     })
        
   },   
}


