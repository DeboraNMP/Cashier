const knex = require('../connectionDb')



const userProfile = async (req, res) => {

    try {
        return res.status(200).json(req.user)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }

}

module.exports = userProfile

