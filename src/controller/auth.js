const UsersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { body } = req;
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

const login = async (req, res) => {
    const { email, password_hash } = req.body;

    try {
        const [user] = await UsersModel.findUserByEmail({ email });
        if (user.length === 0) {
            res.status(404).json({
                message: 'Login Failed'
            });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password_hash, user[0].password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Login Failed'
            });
        }

        const payload = {
            data: user[0]
        };

        const secret = process.env.JWT_SECRET;

        const expiresIn = { expiresIn: '1h' };

        const token = jwt.sign(payload, secret, expiresIn);

        res.status(200).json({
            message: 'Login Success',
            data : {
                user
            },
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
}

module.exports = {
    register,
    login
}