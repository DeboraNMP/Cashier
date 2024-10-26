const knex = require('../connectionDb')

const editProduct = async (req, res) => {

    const { id } = req.params
    const { description, stock_quantity, price, category_id } = req.body

    try {
        const productExists = await knex.select('id').from('products')
            .where({ id }).first();

        if (!productExists) {
            return res.status(400).json({ message: "The product informed does not exist." })
        }

        const categorytExists = await knex.select('id').from('categories')
            .where({ id: category_id }).first();

        if (!categorytExists) {
            return res.status(400).json({ message: "The category informed does not exist." })
        }

        const updatedProduct = await knex('products').where({ id }).update({
            description, stock_quantity, price, category_id
        }).returning("*")

        return res.status(200).json(updatedProduct)

    } catch (error) {
        return res.status(500).json({ mensagem: "Internal server error." });
    }
}

module.exports = editProduct