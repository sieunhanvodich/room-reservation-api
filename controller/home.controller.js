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
        findBookInfos = (arr) => {
            let new_array = []
            for (var i = 0; i < arr.length; i++) {
                let dateFormatted = moment(arr[i].from).format('DD-MM-YYYY');
                if (dateFormatted === date) {
                    new_array.push(arr[i])
                }
            }
            return new_array
        }
        let bookInfos = await bookInfosModel.find({ host_id: userID}).populate('room_id');
        
        let bookInfosFinded = findBookInfos(bookInfos);

        console.log(bookInfosFinded)
        
        res.json({
          bookInfosFinded
        })

    }
}