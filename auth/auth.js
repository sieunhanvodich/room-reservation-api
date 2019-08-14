const jwt = require('jsonwebtoken')
const SECRET_KEY = 'asterix-needs-permit-a-38'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, SECRET_KEY, process.env.JWT_KEY)
        req.token = token
        next()
    } catch (error) {
        // res.status(401).send({ error: 'Not authorized to access this resource' })
        res.json({ error: 'Not authorized to access this resource' })
    }

}

module.exports = auth