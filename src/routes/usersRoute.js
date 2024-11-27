const express = require('express');

const UserController = require('../controller/userController.js');

const router = express.Router();

// router.post('/login', UserController.login);
// router.post('/register', UserController.register);

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createNewUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;