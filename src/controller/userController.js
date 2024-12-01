const UsersModel = require('../models/usersModel');

// const redeemPoints = async (req, res) => {
//     const { achievements_id } = req.params;
//     try {
//         const [data] = await UsersModel.redeemPoints(achievements_id);
//         res.json({
//             message: 'Success',
//             data: data
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             serverMessage: error.message
//         });
//     }
// };

const getUserBadges = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await UsersModel.getUserBadgesById(id);
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Failed',
                data: 'No badges not found'
            })
        }
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
    // getUserBadgesById,
    
}
