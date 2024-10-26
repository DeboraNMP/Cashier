const knex = require('../connectionDb')

const detailClient = async (req, res) => {

    const { id } = req.params

    try {
        const checkClient = await knex.select('id').from('client').where({ id }).first()

        if (!checkClient) {
            return res.status(400).json({ message: "Client does not exist." })
        }

        const client = await knex.select('*').from('client').where({ id }).first().returning('*');
        return res.status(200).json(client)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}
module.exports = detailClient