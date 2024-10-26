const knex = require('../connectionDb');

const orderRegistration = async (req, res) => {
    const { client_id, observation, orders_products } = req.body

    if (!client_id || !orders_products) {
        return res.status(400).json({ message: "All fields are mandatory" })
    }

    try {
        const checkClient = await knex.select('id').from('client').where({ id }).first()
        if (!checkClient) {
            return res.status(404).json({ message: "Client does not exist." })
        }

        const total = []

        for (const item of orders_products) {
            const checkProduct = await knex.select('id', 'stock_quantity', 'price').from('products').where({ id: item.product_id }).first();
            if (!checkProduct) {
                return res.status(404).json({ message: "Product does not exist." });
            }

            if (item.product_quantity < checkProduct.stock_quantity) {
                return res.status(400).json({ mensagem: "Insufficient stock" });
            }

            total.push(checkProduct.price)

        }

        let totalPrice = 0

        for (let i = 0; i < orders_products.length; i++) {
            totalPrice += orders_products[i].product_quantity * total[i]
        }

        await knex('orders').insert({
            client_id, observation: observation || '', amount: amount
        }).returning('id');

    } catch (error) {
        console.log(erro.message)
        return res.status(500).json({ message: "Internal server error." })
    }
}

module.exports = orderRegistration

