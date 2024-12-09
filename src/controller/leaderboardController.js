const leaderboardModels = require('../models/leaderboard');

const getLeaderboard = async (req, res) => {
    try {
        const [data] = await leaderboardModels.getLeaderboard();
        if(data.length === 0){
            return res.status(404).json({
                message: 'Failed',
                data: 'No data found'
            })
        }
        res.json({
            message: 'getLeaderboardSuccess',
            data: data.map(item => {
                return {
                    username : item.username,
                    points : item.points
                }
            })
        })
    } catch (error) {
        res.status(404).json({
            message: "Data Not Found",
            serverMessage: error.message
        });
    }

};

module.exports = {
    getLeaderboard
}