const bookInfosModel = require('../models/book_infos.model');
const userModel = require('../models/user.model')

const departmentModel = require('../models/department.model')
const roleModel = require('../models/role.model')
const roomModel = require('../models/room.model')
const moment = require('moment');
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;


module.exports = {
    getAll: async (req, res, next) => {

        var date = req.query['date'];
        console.log(date)
        const userID = "5d4902f4df293ac6ec0b98bc";
        // findBookInfos = (arr) => {
        //     let new_array = []
        //     for (var i = 0; i < arr.length; i++) {
        //         let dateFormatted = moment(arr[i].from).format('DD-MM-YYYY');
        //         if (dateFormatted === date) {
        //             new_array.push(arr[i])
        //         }
        //     }
        //     return new_array
        // }
        // let bookInfos = await bookInfosModel.find({ host_id: userID });
        
        // let bookInfosFinded = findBookInfos(bookInfos);


        // bookInfosModel.find({ host_id: userID})
        // .populate('room')
        // .exec((err, result) => {
        //     if (err) return 'duong';
        //     console.log(result);
        // });

        var result = (await bookInfosModel.find({ host_id: userID })).map(async bookInfo => {
            // console.log(bookInfo.room_id);
            var room = await roomModel.findById({_id: bookInfo.room_id});
            // console.log(room);
            // roomModel.findById({_id: bookInfo.room_id}, (err, room) => {
            //     bookInfo.room = {};
            //     bookInfo.room = room;
            // })
            bookInfo.room = room;
        });
        
        // console.log(result.map(async bookInfo => {
        //     console.log(bookInfo.room_id);
        //     var room = await roomModel.findById({_id: bookInfo.room_id});
        //     console.log(room);
        //     roomModel.findById({_id: bookInfo.room_id}, (err, room) => {
        //         bookInfo.room = {};
        //         bookInfo.room = room;
        //     })
        //     bookInfo.room = room;
        // }))


        // console.log(bookInfosFinded)
        // let id_room = bookInfosFinded.room_id;
        // let room = await roomModel.findById({ _id: ObjectId(id_room) });

        // let meeting_name = bookInfosFinded.name;
        // let name_room = room.name;
        // let time_from = moment(bookInfosFinded.from).format('HH:mm') ;
        // let time_to = moment(bookInfosFinded.to).format('HH:mm') ;

        // let time_now = moment(new Date()).format('HH:mm')
        // let status = false;
        // if (time_from <= time_now && time_to>= time_now){
        //     status = true;
        // }

        res.json({
            // bookInfos : bookInfosFinded,
            // meeting_name: meeting_name,
            // name_room: name_room,
            // time_from,
            // time_to,
            // status
        })

    }
}