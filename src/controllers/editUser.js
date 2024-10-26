const knex = require('../connectionDb')
const bcrypt = require('bcrypt')
const ckeckUser = require('../authentication')

const editUser = async (req, res) => {
    const { name, email, password } = req.body
    const { id } = req.user[0]

    if (!name || !email || !password) {
        return res.status(404).json({ message: "All fields are mandatory" })
    }
    try {
        const encryptedPassword = await bcrypt.hash(password, 10)

        const checkEmail = await knex('users').where({ email }).select('email')

        if (checkEmail.length > 0 && checkEmail[0].email !== req.user[0].email) {
            return res.status(404).json({ message: "The email is already being used by another user" })
        }

        const updateUser = await knex('users').where({ id }).update({ name, email, password: encryptedPassword }).returning('*')
        return res.status(200).json(updateUser)

    } catch (error) {

        return res.status(500).json({ message: "Internal server error." })
    }

}

module.exports = editUser