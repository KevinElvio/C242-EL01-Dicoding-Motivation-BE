const dbPool = require('../config/database');

const getLeaderboard = () => {
    const SQLQuery = 'SELECT * FROM users ORDER BY points DESC;';
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getLeaderboard
};