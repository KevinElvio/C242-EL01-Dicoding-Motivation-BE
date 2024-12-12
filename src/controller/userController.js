const UsersModel = require('../models/usersModel');


const postUserBadges = async (req, res) => {
    const { id, idBadges } = req.params
    try {
        await UsersModel.postUserBadges(id, idBadges);
        await UsersModel.putUserBadges(idBadges);
        const [data] = await UsersModel.getUserBadgesId(id);
        res.status(201).json({
            message: 'Success Clamied Badge',
            data: data.map((item) => ({
                name: item.name,
                description: item.description,
                points_reward: item.points_reward
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};

const getAllRedeemPoints = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllRedeemPoints();
        res.json({
            message: 'Success',
            data: data,
            // value = data.map((item) => ({
            //     ...item,
            //     claim : item.claim === 1 ? true : false
            // }))
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};
const getRedeemPoints = async (req, res) => {
    const { item_id } = req.params;
    try {
        const [data] = await UsersModel.getRedeemPoints(item_id);
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

const postRedeemPoints = async (req, res) => {
    const { id, idRedeems } = req.params;
    try {
        await UsersModel.postRedeemPoints(id, idRedeems);
        await UsersModel.putRedeemPoints(idRedeems);
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
            data: value = data.map((item) => ({
                ...item,
                claim : item.claim === 1 ? true : false
            }))
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
        const [data] = await UsersModel.getUserBadgesId(id);
        res.json({
            message: 'Success',
            data : data.map((item) => ({
                name : item.name,
                description : item.description,
                points_reward : item.points_reward
            }))
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
    getRedeemPoints,
    postUserBadges,
    postRedeemPoints,
    getAllRedeemPoints

}
