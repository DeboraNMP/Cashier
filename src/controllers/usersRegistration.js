const knex = require('../connectionDb')
const bcrypt = require('bcrypt')

const usersRegistration = async (req, res) => {

    const { name, email, password } = req.body

    try {
        const encryptedPassword = await bcrypt.hash(password, 10)

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory" })
        }

        const checkEmail = await knex.select('email').from('users').where({ email })

        if (checkEmail.length > 0) {
            return res.status(404).json({ message: "The email is already being used by another user" })
        }

        const newUser = await knex('users').insert({ name, email, password: encryptedPassword }).returning('*')
        return res.status(200).json(newUser)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = usersRegistration