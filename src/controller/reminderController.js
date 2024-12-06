const { once } = require('nodemon');
const remindersModel = require('../models/reminders');

const getReminders = async (req, res) => {
    try {
        const [rows] = await remindersModel.getReminders();
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Failed',
                data: 'No data found'
            })
        }
        res.status(200).json({
            message : 'get Reminders Success',
            data: rows.map(item => {
                return {
                    reminder_id : item.reminder_id,
                    name : item.name,
                    frequency : item.frequency,
                    time : item.reminder_time
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

const getReminderById = async (req, res) => {
    const { reminders_id } = req.params;
    try {
        const [rows] = await remindersModel.getReminderById(reminders_id);
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Failed',
                data: 'No data found'
            })
        }
        if(rows[0].frequency == 'Daily'){
            res.status(200).json({
                message : 'get Reminders Success',
                data: rows.map(item => {
                    return {
                        name : item.name,
                        frequency : item.frequency,
                        time : item.reminder_time
                    }
                })
            });
        }
        else if(rows[0].frequency == 'Weekly'){
            res.status(200).json({
                message : 'get Reminders Success',
                data: rows.map(item => {
                    return {
                        name : item.name,
                        frequency : item.frequency,
                        time : item.reminder_time,
                        days : item.days_of_week
                    }
                })
            });
        }
        else if(rows[0].frequency == 'Once'){
            res.status(200).json({
                message : 'get Reminders Success',
                data: rows.map(item => {
                    return {
                        name : item.name,
                        frequency : item.frequency,
                        time : item.reminder_time,
                        date : once_date
                    }
                })
            });
        }
        
    }
    catch (error) {
        res.status(404).json({
            message: "Data Not Found",
            serverMessage: error.message
        });
    }
};

const addReminder = async (req, res) => {
    const { id } = req.params;
    const { name, frequency, time, days, date, course_ids } = req.body;
    console.log(days);
    try {
        await remindersModel.addReminder(id, name, frequency, time, days, date, course_ids);
        res.status(201).json({ 
            message: 'Reminder added successfully' 
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};

const updateReminder = async (req, res) => {
    const { reminders_id } = req.params;
    const { name, frequency, time, days, date } = req.body;
    try {
        await remindersModel.updateReminder(reminders_id, name, frequency, time, days, date);
        res.json({ message: 'Reminder updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};

const deleteReminder = async (req, res) => {
    const { reminders_id } = req.params;
    try {
        await remindersModel.deleteReminder(reminders_id);
        res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};

module.exports = {
    getReminders,
    getReminderById,
    addReminder,
    updateReminder,
    deleteReminder
};

