const knex = require('./connectionDb')

const detailProduct = async (req, res) => {
    const { id } = req.params

    try {

        const productExists = await knex.select('id').from('products')
            .where({ id }).first();

        if (!productExists) {
            return res.status(400).json({ message: "Product not registered." })
        }

        const product = await knex.select('*').from('products').where({ id }).first().returning('*');
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ mensagem: "Internal server error." });
    }
}
module.exports = detailProduct