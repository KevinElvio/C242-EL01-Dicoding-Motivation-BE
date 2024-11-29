const userModel = require('../models/usersModel');

const getStreak = async (req, res) => {
    try {
        const [data] = await userModel.getAllUsers();
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Failed',
                data: 'No data found'
            })
        }
        res.json({
            message: 'getStreakSuccess',
            data: data.map(item => {
                return {
                    username: item.username,
                    current_streak: item.current_streak,
                    longest_streak: item.longest_streak
                }
            })
        });
    } catch (error) {
        res.status(404).json({
            message: "Data Not Found",
            serverMessage: error.message
        });
    }
};

module.exports = {
    getStreak
};
