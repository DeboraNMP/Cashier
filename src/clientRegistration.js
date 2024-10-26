const knex = require('./connectionDb');

const clientRegistration = async (req, res) => {
    const { name, email, cpf } = req.body

    if (!name || !email || !cpf) {

        return res.status(400).json({ message: "All fields are mandatory" })
    }

    try {

        const checkEmail = await knex.select('email').from('client').where({ email })
        if (checkEmail.length > 0) {
            return res.status(404).json({ message: "The email is already being used by another client" })
        }

        const checkCpf = await knex.select('cpf').from('client').where({ cpf })
        if (checkCpf.length > 0) {
            return res.status(404).json({ message: "The cpf is already being used by another client" })
        }

        const client = await knex('client').insert({ name, email, cpf }).returning('*')
        return res.status(201).json(client)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = clientRegistration