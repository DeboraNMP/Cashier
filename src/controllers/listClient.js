const knex = require('../connectionDb')

const clients = async (req, res) => {

    try {
        const listClients = await knex('client')

        return res.status(200).json(listClients)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = clients