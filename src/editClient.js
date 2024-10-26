const knex = require('./connectionDb')

const editClient = async (req, res) => {
    const { name, email, cpf } = req.body
    const { id } = req.params

    if (!name || !email || !cpf) {

        return res.status(400).json({ message: "All fields are mandatory" })
    }

    try {
        const checkClient = await knex.select('id').from('client').where({ id }).first()
        if (!checkClient) {
            return res.status(404).json({ message: "Client does not exist." })
        }

        const checkEmail = await knex.select('email').from('client').where({ email })
        if (checkEmail.length > 0) {
            return res.status(404).json({ message: "The email is already being used by another client" })
        }

        const checkCpf = await knex.select('cpf').from('client').where({ cpf })
        if (checkCpf.length > 0) {
            return res.status(404).json({ message: "The cpf is already being used by another client" })
        }

        const client = await knex('client').update({ name, email, cpf }).returning('*')
        return res.status(200).json(client)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = editClient