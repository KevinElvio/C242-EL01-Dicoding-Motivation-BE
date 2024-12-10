const dbPool = require('../config/database');


// const getUserBadgesById = (user_id,) => {
//     const SQLQuery = `
//     SELECT * FROM user_achievements WHERE user_id = ?;`;
//     return dbPool.execute(SQLQuery, [user_id]);
// }

// const redeemPoints = (user_id) => {
//     const SQLQuery = `
//     SELECT * FROM achievements WHERE achievements_id = ?;`;
//     return dbPool.execute(SQLQuery, [achievements_id]);
// };


const lastLogin = (body, user_id) => {
    const SQLQuery = `
            UPDATE users
            SET last_login = ?
            WHERE user_id = ?;
            `;

    const values = [
        body.last_login,
        user_id,
    ];
    return dbPool.execute(SQLQuery, values);
};


const findUserByEmail = (body) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [body.email]);
};

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';
    return dbPool.execute(SQLQuery)
};

const getUserBadges = () => {
    const SQLQuery = `SELECT * FROM achievements;`;
    return dbPool.execute(SQLQuery);
}
const putUserBadges = (achievement_id) => {
    const SQLQuery = `UPDATE achievements SET claim = 1 WHERE achievement_id = ?;`;
    return dbPool.execute(SQLQuery, [achievement_id]);
}

const postUserBadges = (user_id, achievement_id) => {
    const SQLQuery = `INSERT INTO user_achievements(user_id, achievement_id, earned_at) VALUES(?, ?, NOW());`;
    return dbPool.execute(SQLQuery, [user_id, achievement_id]);
}

const getUserBadgesId = (user_id) => {
    const SQLQuery = `SELECT 
    achievements.name,
    achievements.description,
    achievements.points_reward,
    achievements.claim
    FROM 
    user_achievements
    JOIN 
    achievements 
    ON 
    user_achievements.achievement_id = achievements.achievement_id
    WHERE 
    user_achievements.user_id = ?;`;
    return dbPool.execute(SQLQuery, [user_id]);
}

const getRedeemPoints = (user_id) => {
    const SQLQuery = `SELECT 
    ui.user_id,
    ri.item_id,
    ri.name AS item_name,
    ri.description,
    ri.points,
    ui.redeem_at
    FROM 
    user_items ui
    JOIN 
    redeem_items ri 
    ON 
    ui.item_id = ri.item_id
    WHERE 
    ui.user_id = ?;
`;
    return dbPool.execute(SQLQuery, [user_id]);
}

const postRedeemPoints = (user_id, item_id) => {
    const SQLQuery = `INSERT INTO user_items(user_id, item_id, redeem_at) VALUES(?, ?, NOW());`;
    return dbPool.execute(SQLQuery, [user_id, item_id]);
}


const createNewUser = (body) => {

    const SQLQuery = `
    INSERT INTO users (email, username, password_hash, github_profile, points, current_streak, longest_streak) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`;

    const values = [
        body.email,
        body.username,
        body.password_hash,
        body.github_profile,
        body.points,
        body.current_streak,
        body.longest_streak
    ];

    return dbPool.execute(SQLQuery, values);
};

const updateUser = (body, user_id) => {
    const SQLQuery = `
    UPDATE users
    SET email = ?, username = ?, password_hash = ?, github_profile = ?, points = ?, current_streak = ?, longest_streak = ?
    WHERE user_id = ?;`;

    const values = [
        body.email,
        body.username,
        body.password_hash,
        body.github_profile,
        body.points,
        body.current_streak,
        body.longest_streak,
        user_id,
    ];
    return dbPool.execute(SQLQuery, values);
};

const deleteUser = (user_id) => {
    const SQLQuery = `
    DELETE FROM users
    WHERE user_id = ?;
    `;

    return dbPool.execute(SQLQuery, [user_id]);
};

const addRefreshToken = (user_id, refresh_token) => {
    const SQLQuery = `UPDATE users SET refresh_token = ? WHERE user_id = ?;`;
    const values = [refresh_token, user_id];
    console.log('in');
    return dbPool.execute(SQLQuery, values);
}

const getRefreshToken = (user_id) => {
    const SQLQuery = `SELECT refresh_token from users where user_id = ?;`
    return dbPool.execute(SQLQuery, [user_id]);
}

const getGcrId = (reminder_id) => {
    const SQLQuery = `SELECT gcr_id from learning_reminders where reminder_id = ?;`
    return dbPool.execute(SQLQuery, [reminder_id]);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    findUserByEmail,
    getUserBadges,
    getUserBadgesId,
    getRedeemPoints,
    lastLogin,
    addRefreshToken,
    getRefreshToken,
    getGcrId,
    lastLogin,
    postUserBadges,
    putUserBadges,
    postRedeemPoints


}
