const dbPool = require('../config/database');


const findUserByEmail = (body) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [body.email]);
};

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';
    return dbPool.execute(SQLQuery)
};

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
    WHERE user_id = ?;
    `;

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

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    findUserByEmail
}
