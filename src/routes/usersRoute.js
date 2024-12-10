const express = require('express');
const accessValidation = require('../middleware/accessValidation');
const router = express.Router();

// Controller
const leaderboardController = require('../controller/leaderboardController');
const UserController = require('../controller/userController');
const streakController = require('../controller/streakController');
const remindersController = require('../controller/reminderController');
const auth = require('../controller/auth');

// Auth
router.post('/login', auth.login);
router.post('/register', auth.register);

// Users
router.get('/users', accessValidation, UserController.getAllUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users/badges', UserController.getUserBadges);
router.get('/users/:id/badges', UserController.getUserBadgesId);
router.post('/users/:id/badges/:idBadges', UserController.postUserBadges);

// Streak
router.get('/users/streak', streakController.getStreak);
router.get('/users/streak/:id', streakController.getByIdStreak);

// Reminders
router.get('/users/:id/reminders', remindersController.getReminders);
router.get('/users/:id/reminders/:reminders_id', remindersController.getReminderById);
router.post('/users/:id/reminders', remindersController.addReminder);
router.put('/users/:id/reminders/:reminders_id', remindersController.updateReminder);
router.delete('/users/:id/reminders/:reminders_id', remindersController.deleteReminder);

// Google Calendar Auth routes
router.get('/users/:id/google-auth', remindersController.getAuthUrl);
router.get('/users/:id/google-callback', remindersController.handleAuthCallback);

// Reedem Points
router.get('/users/:id/redeems', UserController.getRedeemPoints);
router.get('/users/redeems', UserController.getAllRedeemPoints);
router.post('/users/:id/redeems/:idRedeems', UserController.postRedeemPoints);

// leaderboard
router.get('/leaderboards', leaderboardController.getLeaderboard);


module.exports = router;