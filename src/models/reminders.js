const dbPool = require('../config/database');

const getReminders = async (userId) => {
    const SQLQuery = 'SELECT * FROM learning_reminders where user_id = ?';
    return dbPool.execute(SQLQuery, [userId]);
}

const getReminderById = async (reminder_id, userId) => {
    const SQLQuery = 'SELECT * FROM learning_reminders WHERE reminder_id = ? and user_id = ?';
    return dbPool.execute(SQLQuery, [reminder_id, userId]);
};



const addReminder = async (userId, name, frequency, time, days, date, course_ids, gcr_id) => {
    try {
        // Insert ke tabel learning_reminders
        const reminderQuery = 'INSERT INTO learning_reminders (user_id, name, frequency, reminder_time, days_of_week, once_date, gcr_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [reminderResult] = await dbPool.execute(reminderQuery, [userId, name, frequency, time, days, date, gcr_id]);
        
        // Get reminder_id yang baru dibuat
        const newReminderId = reminderResult.insertId;
        
        // Insert ke tabel course_learning_reminders untuk setiap course_id
        const courseReminderQuery = 'INSERT INTO course_learning_reminders (course_id, reminder_id) VALUES (?, ?)';
        const courseInsertPromises = course_ids.map(courseId => 
            dbPool.execute(courseReminderQuery, [courseId, newReminderId])
        );
        
        // Jalankan semua insert
        await Promise.all(courseInsertPromises);
        
        return reminderResult;
    } catch (error) {
        throw error;
    }
};

const updateReminder = async (reminderId, name, frequency, time, days, date) => {
    const SQLQuery = 'UPDATE learning_reminders SET name = ?, frequency = ?, reminder_time = ?, days_of_week = ?, once_date = ? WHERE reminder_id = ?';
    return dbPool.execute(SQLQuery, [name, frequency, time, days, date, reminderId]);
};

const deleteReminder = async (reminderId) => {
    const deleteRelatedQuery = 'DELETE FROM `course_learning_reminders` WHERE `reminder_id` = ?';
    dbPool.execute(deleteRelatedQuery,[reminderId]);
    const SQLQuery = 'DELETE FROM learning_reminders WHERE reminder_id = ?';
    return dbPool.execute(SQLQuery, [reminderId]);
};

module.exports = {
    getReminders,
    getReminderById,
    addReminder,
    updateReminder,
    deleteReminder
};