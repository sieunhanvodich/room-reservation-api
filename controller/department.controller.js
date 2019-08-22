const Department = require('../models/department.model');

module.exports = {
    listDepartments: (req, res) => {
        try {
            Department.findById({_id: '5d490435df293ac6ec0b9970'}, (err, departments) => {
                if (err) throw err
                res.json({message:"Success"})
            })
        } catch (error) {
            // res.status(400).send(error)
            res.json(error.message)
        }
    }
}