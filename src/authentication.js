const jwt = require('jsonwebtoken')
const knex = require('../src/connectionDb')
const jwtPassword = process.env.JWTPASS

const ckeckUser = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(404).json({ message: "Not authorized!" })
    }

    const token = authorization.split(' ')[1]

    try {

        const { id } = jwt.verify(token, jwtPassword)

        const user = await knex.select('*').from('users').where({ id })

        if (user.length < 1) {
            return res.status(401).json({ message: "Not authorized!" })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = ckeckUser