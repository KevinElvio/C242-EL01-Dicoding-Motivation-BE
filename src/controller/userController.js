const UsersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers();
        res.json({
            message: 'getAllUserSuccess',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
}

const createNewUser = async (req, res) => {
    const {body} = req;
    try {
        const password_hash = bcrypt.hashSync(body.password_hash, 10);
        body.password_hash = password_hash;
        await UsersModel.createNewUser(body);
        res.status(201).json({
            message: 'createNewUserSuccess',
            data: body
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
            message: 'updateUserSuccess',
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
            message: 'deleteUserSuccess',
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
    createNewUser,
    updateUser,
    deleteUser
}