const knex = require('./connectionDb');

const listProducts = async (req, res) => {

    const { category_id } = req.query

    try {
        // const categories = await knex('categories')

        // if (categories) {
        //     return res.status(200).json(categories)
        // }

        const categorytExists = await knex.select('id').from('categories')
            .where({ id: category_id }).first().returning('*');

        if (!categorytExists) {
            return res.status(400).json({ message: "The category informed does not exist." })
        } else {
            return res.status(200).json(categorytExists)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Internal server error." });
    }
}



module.exports = listProducts;