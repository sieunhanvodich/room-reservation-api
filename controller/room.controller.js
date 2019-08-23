const roomModel = require('../models/room.model');
const bookInfo = require('../models/book_infos.model');
const bookType = require('../models/book_types.model')
const moment = require('moment')
module.exports = {
     getRoomList: async (req, res, next) => {
          let roomList = await roomModel.find({});
          console.log(roomList)
          let date = req.query['date']
         
          let bookInfos = await bookInfo.find({}).populate('book_type_id').populate('room_id');

          function filterDate(arr) {
               let new_arr = []
               for (var i=0;i<arr.length;i++){
                    let formatDate = moment(arr[i].from).format('DD-MM-YYYY');
                    if(formatDate === date){
                         new_arr.push(arr[i])
                    }
               }
               return new_arr;
          }

          let bookInfosFinded = filterDate(bookInfos);
          

          res.json({
               bookInfosFinded,
               roomList
          })

     },
}


