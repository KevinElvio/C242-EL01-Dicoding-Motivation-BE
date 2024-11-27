// const UsersModel = require('../models/usersModel');

// const createNewUser = async (req, res) => {
//     const {body} = req;
//     try {        
//         await UsersModel.createNewUser(body);
//         res.status(201).json({
//             message: 'createNewUserSuccess',
//             data: body
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             serverMessage: error.message
//         });
//     }
// }

// module.exports = {
//     createNewUser,
// }