const User = require('../models/user.model')

module.exports = {
    info: (req, res) => {
        User.find({ name: 'linh' }, function (error, user) {
            res.json(user);
        });
    },
    login: async (req, res) => {
        console.log(req.body);
        try {
            const email = req.body.username
            const password = req.body.password
            const user = await User.findByCredentials(email, password)
            const token = user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            // res.status(400).send(error)
            res.json(error.message)
        }
    },
    listUsers: async (req, res) => {
        try {
            await User.find({}, function(err, users) {
                res.send(users)
              });
        } catch (error) {
            // res.status(400).send(error)
            res.json(error.message)
        }
    }
};