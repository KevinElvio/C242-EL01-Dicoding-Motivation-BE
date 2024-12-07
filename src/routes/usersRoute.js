const express = require('express');
const accessValidation = require('../middleware/accessValidation');
const router = express.Router();

// Controller
const leaderboardController = require('../controller/leaderboardController');
const UserController = require('../controller/userController');
const streakController = require('../controller/streakController');
const remindersController = require('../models/reminders');
const auth = require('../controller/auth');

// Auth
router.post('/login', auth.login);
router.post('/register', auth.register);

// Users
router.get('/users', accessValidation, UserController.getAllUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users/badges', UserController.getUserBadges);
// router.get('/users/:id/badges/:badges_id', UserController.getUserBadgesById);

// Streak
router.get('/users/streak', streakController.getStreak);

// Reminders
// router.get('/users/{id}/reminders', remindersController.getReminders);

// Reedem Points
// router.get('/users/{id}/redeems/', UserController.redeemPoints);

// leaderboard
router.get('/leaderboards', leaderboardController.getLeaderboard);


module.exports = router;