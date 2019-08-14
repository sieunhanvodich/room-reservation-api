const User = require('../models/user.model');

module.exports = {
    info: (req, res) => {
        User.find({ name: 'linh' }, function (error, user) {
            res.json(user);
        });
    },
    login: async (req, res) => {
        try {
            const email = req.body.username
            const password = req.body.password
            const user = await User.findByCredentials(email, password)
            if (!user) {
                res.json({ status: "Error 1" })
                // return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            // res.status(400).send(error)
            res.json({ error: "error" })
        }
    }
};