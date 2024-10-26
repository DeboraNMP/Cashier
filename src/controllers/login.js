const knex = require('../connectionDb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtPassword = process.env.JWTPASS

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(404).json({ message: "All fields are mandatory" })
    }

    try {
        const user = await knex.select('*').from('users').where({ email }).first()

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) {
            return res.status(404).json({ message: "Incorrect password" })
        }

        const token = jwt.sign({ id: user.id }, jwtPassword, { expiresIn: "24h" })

        const { password: _, ...userData } = user

        return res.status(200).json({
            user: userData, token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = login