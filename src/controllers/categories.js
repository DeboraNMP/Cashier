const knex = require('../connectionDb')

const categories = async (req, res) => {

    try {
        const categories = await knex('categories')
        return res.json(categories)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })

    }
}

module.exports = categories