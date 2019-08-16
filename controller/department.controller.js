const Department = require('../models/department.model');

module.exports = {
    listDepartments: async (req, res) => {
        try {
            await Department.find({}, function(err, rooms) {
                res.send(rooms)
              })
        } catch (error) {
            // res.status(400).send(error)
            res.json(error.message)
        }
    }
}