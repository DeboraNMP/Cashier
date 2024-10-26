const knex = require('./connectionDb')

const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const productExists = await knex.select('id').from('products').where({ id }).first();

        if (!productExists) {
            return res.status(400).json({ message: "Product not registered." })
        }

        const exclusion = await knex.select('id').from('products').where({ id }).del()
        return res.status(204).json()

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = deleteProduct