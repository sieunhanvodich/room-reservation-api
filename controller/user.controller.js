const user = require('../models/user.model');

module.exports = {
    info: (req, res) => {
        user.find({name: 'duong'}, function(error, user) {
            res.json(user);
        });
    },
    login: (req, res) => {
        user.find({email: req.body.username}, (error, user) => {
            if (error) {
                console.log(error);
                res.json({
                    status: 1
                });
            };
            if (req.body.password === user[0].password) {
                
                res.json({
                    status: 2,
                    name: user[0].name,
                })
            }

        })
    }

};