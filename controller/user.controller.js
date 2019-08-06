const user = {
    info: (req, res) => {
        user.find({name: 'duong'}, function(error, user) {
            res.json(user);
        });
    },
    login: (req, res) => {

    }
};

module.exports = user;