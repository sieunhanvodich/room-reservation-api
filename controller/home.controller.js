const bookInfosModel = require('../models/book_infos.model');
const userModel = require('../models/user.model')

const departmentModel = require('../models/department.model')
const roleModel = require('../models/role.model')

const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;


module.exports = {
    getAll: async (req, res, next) => {
        let userId = '5d4902f4df293ac6ec0b98bc';
        let user = await userModel.findById({ _id: userId });
        let bookInfos = await bookInfosModel.find({ host_id: ObjectId(user._id) });

        let department = await departmentModel.findById({ _id: ObjectId(user.id_department) });
        let roles = await roleModel.find({ _id: ObjectId(user.id_roles) });



        res.json({
            user: user,
            bookInfos: bookInfos,
            department: department,
            roles : roles
        })

    }
}