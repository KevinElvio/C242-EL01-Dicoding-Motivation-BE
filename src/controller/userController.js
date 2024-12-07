const UsersModel = require('../models/usersModel');

const getRedeemPoints = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await UsersModel.getRedeemPoints(id);
        res.json({
            message: 'Success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};




const getUserBadges = async (req, res) => {
    try {
        const [data] = await UsersModel.getUserBadges();
        res.json({
            message: 'Success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
}
const getUserBadgesId = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await UsersModel.getUserBadges(id);
        res.json({
            message: 'Success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });

    }
}

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers();
        res.json({
            message: 'Success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
}



const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await UsersModel.updateUser(body, id);
        res.json({
            message: 'Success',
            data: {
                id: id,
                ...body
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });

    }

}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UsersModel.deleteUser(id);
        res.json({
            message: 'Success',
            body: null
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
}





module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUserBadges,
    getUserBadgesId,
    getRedeemPoints

}
