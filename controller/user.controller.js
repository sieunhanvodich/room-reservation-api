const user = require('../models/user.model');

module.exports = {
    info: (req, res) => {
        user.find({ name: 'duong' }, function (error, user) {
            res.json(user);
        });
    },
    login: async (req, res) => {
        // user.find({email: req.body.username}, (error, user) => {
        //     if (error) {
        //         console.log(error);
        //         res.json({
        //             status: 1
        //         });
        //     };
        //     if (req.body.password === user[0].password) {

        //         res.json({
        //             status: 2,
        //             name: user[0].name,
        //         })
        //     }

        // })
        try {
            const email = req.body.username
            const password = req.body.password
            console.log(user.findByCredentials)
            const user = await user.findByCredentials(email, password)
            console.log(user)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            console.log(token)
            res.send({ user, token })
        } catch (error) {
            res.json({status: "Error"})
            // res.status(400).send(error)
        }
    }
};