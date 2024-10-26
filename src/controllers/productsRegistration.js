const knex = require('../connectionDb')

const products = async (req, res) => {

    const { description, stock_quantity, price, category_id } = req.body

    try {
        const categorytExists = await knex.select('id').from('categories')
            .where({ id: category_id }).first();

        if (!categorytExists) {
            return res.status(400).json({ message: "The category informed does not exist." })
        }

        const newProduct = await knex('products').insert({
            description, stock_quantity, price, category_id
        }).returning('*');

        return res.status(201).json(newProduct)

    } catch (error) {
        return res.status(500).json({ mensagem: "Internal server error." });
    }
}


module.exports = products