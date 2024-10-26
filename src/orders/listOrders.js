const knex = require('../connectionDb')

const listOrders = async (req, res) => {
    const { client_id } = req.query

    try {
        const list = await knex.select('client_id').from('orders').where({ client_id }).first()
        if (!list) {
            const list2 = await knex.select('*').from('orders').first()
            return res.status(200).json(list2)
        }
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}