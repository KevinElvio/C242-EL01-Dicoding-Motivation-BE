const express = require('express');
const accessValidation = require('../middleware/accessValidation');
const leaderboardController = require('../controller/leaderboardController');
const UserController = require('../controller/userController');
const auth = require('../controller/auth');
const router = express.Router();

// Auth
router.post('/login', auth.login);
router.post('/register', auth.register);

// Users
router.get('/users', accessValidation, UserController.getAllUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users/:id/badges', UserController.getUserBadges);
// router.get('/users/:id/badges/:badges_id', UserController.getUserBadgesById);

// Reedem Points
// router.get('/users/{id}/redeems/', UserController.redeemPoints);

// leaderboard
router.get('/leaderboards', leaderboardController.getLeaderboard);


module.exports = router;