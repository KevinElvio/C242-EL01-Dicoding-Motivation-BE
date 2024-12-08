const { once } = require("nodemon");
const remindersModel = require("../models/reminders");
const usersModel = require("../models/usersModel");
// const { oAuth2Reminder } = require('/oAuth2Reminder');
const { google } = require("googleapis");
const { default: axios } = require("axios");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

const getReminders = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await remindersModel.getReminders(id);
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Failed",
        data: "No data found",
      });
    }
    res.status(200).json({
      message: "get Reminders Success",
      data: rows.map((item) => {
        return {
          reminder_id: item.reminder_id,
          name: item.name,
          frequency: item.frequency,
          time: item.reminder_time,
        };
      }),
    });
  } catch (error) {
    res.status(404).json({
      message: "Data Not Found",
      serverMessage: error.message,
    });
  }
};

const getReminderById = async (req, res) => {
  const { id, reminders_id } = req.params;
  try {
    const [rows] = await remindersModel.getReminderById(reminders_id, id);
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Failed",
        data: "No data found",
      });
    }
    if (rows[0].frequency == "Daily") {
      res.status(200).json({
        message: "get Reminders Success",
        data: rows.map((item) => {
          return {
            name: item.name,
            frequency: item.frequency,
            time: item.reminder_time,
          };
        }),
      });
    } else if (rows[0].frequency == "Weekly") {
      res.status(200).json({
        message: "get Reminders Success",
        data: rows.map((item) => {
          return {
            name: item.name,
            frequency: item.frequency,
            time: item.reminder_time,
            days: item.days_of_week,
          };
        }),
      });
    } else if (rows[0].frequency == "Once") {
      res.status(200).json({
        message: "get Reminders Success",
        data: rows.map((item) => {
          return {
            name: item.name,
            frequency: item.frequency,
            time: item.reminder_time,
            date: once_date,
          };
        }),
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Data Not Found",
      serverMessage: error.message,
    });
  }
};

const getAuthUrl = (req, res) => {
  const { id } = req.params;

  const scope = "https://www.googleapis.com/auth/calendar.events";
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scope,
    prompt: "consent",
    state: id,
  });

  res.json({ authUrl });
};

const handleAuthCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({
      message: "Missing required parameters",
      error: "Code and state are required",
    });
  }

  try {

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return res.status(400).json({
        message: "No refresh token received",
        error: "Please ensure you have proper consent",
      });
    }
    console.log(state);
    await usersModel.addRefreshToken(state, tokens.refresh_token);

    res.redirect("/users/" + state + "/reminders");
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

const addReminder = async (req, res) => {
  const { id } = req.params;
  const { name, frequency, time, days, date, course_ids } = req.body;

  try {

    const [userTokens] = await usersModel.getRefreshToken(id);

    if (
      !userTokens ||
      userTokens.length === 0 ||
      !userTokens[0].refresh_token
    ) {
      return getAuthUrl(req, res);
    }
    oauth2Client.setCredentials({
      refresh_token: userTokens[0].refresh_token,
    });

    await oauth2Client.refreshAccessToken();
    //get quotes from external api
    api_key = process.env.QUOTES_KEY;
    const quotes_api = await axios.get('https://api.api-ninjas.com/v1/quotes?category=learning', {
      headers: {
        'X-Api-Key': `${api_key}`
      }
    });
    // get the quote and the author
    const { quote, author } = quotes_api.data[0];

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    let eventDetails = {
      summary: name,
      description: `<p>"${quote}"</p><p>-${author}</p>`,
      timeZone: "Asia/Jakarta",
    };

    switch (frequency) {
      case "Once":
        eventDetails = {
          ...eventDetails,
          start: {
            dateTime: `${date}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
          end: {
            dateTime: `${date}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
        };
        break;

      case "Daily":
        eventDetails = {
          ...eventDetails,
          start: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
          end: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`, 
            timeZone: "Asia/Jakarta",
          },
          recurrence: ["RRULE:FREQ=DAILY"],
        };
        break;

      case "Weekly":
        const dayMapping = {
          Monday: "MO",
          Tuesday: "TU",
          Wednesday: "WE",
          Thursday: "TH",
          Friday: "FR",
          Saturday: "SA",
          Sunday: "SU",
        };
        const daysArray = days.map((day) => dayMapping[day]);
        eventDetails = {
          ...eventDetails,
          start: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
          end: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`, 
          },
          recurrence: [`RRULE:FREQ=WEEKLY;BYDAY=${daysArray.join(",")};`],
        };

        break;
    }

    eventDetails.reminders = {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 10 }],
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: eventDetails,
    });

    await remindersModel.addReminder(
      id,
      name,
      frequency,
      time,
      days,
      date,
      course_ids,
      response.data.id,
    );

    res.status(201).json({
      message: "Reminder added successfully",
      calendarEventId: response.data.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const updateReminder = async (req, res) => {
  const { id ,reminders_id } = req.params;
  const { name, frequency, time, days, date } = req.body;
  try {
		const [userTokens] = await usersModel.getRefreshToken(id);
    const [eventId] = await usersModel.getGcrId(reminders_id);

    const event_id = eventId[0].gcr_id;
    if(!event_id){
        console.log(id);
    }

    if (
      !userTokens ||
      userTokens.length === 0 ||
      !userTokens[0].refresh_token
    ) {
      return getAuthUrl(req, res);
    }
    oauth2Client.setCredentials({
			refresh_token: userTokens[0].refresh_token,
    });
		
    await oauth2Client.refreshAccessToken();
		const calendar = google.calendar({ version: "v3", auth: oauth2Client });

		let eventDetails = {
      summary: name,
      description: `Learning reminder for: ${name}`,
      timeZone: "Asia/Jakarta",
    };

    switch (frequency) {
      case "Once":
        eventDetails = {
          ...eventDetails,
          start: {
            dateTime: `${date}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
          end: {
            dateTime: `${date}T${time}:00`, 
            timeZone: "Asia/Jakarta",
          },
        };
        break;

      case "Daily":
        eventDetails = {
          ...eventDetails,
          start: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
          end: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`, 
            timeZone: "Asia/Jakarta",
          },
          recurrence: ["RRULE:FREQ=DAILY"],
        };
        break;

      case "Weekly":
        const dayMapping = {
          Monday: "MO",
          Tuesday: "TU",
          Wednesday: "WE",
          Thursday: "TH",
          Friday: "FR",
          Saturday: "SA",
          Sunday: "SU",
        };
        const daysArray = days.map((day) => dayMapping[day]);
        eventDetails = {
          ...eventDetails,
          start: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`,
            timeZone: "Asia/Jakarta",
          },
          end: {
            dateTime: `${new Date().toISOString().split("T")[0]}T${time}:00`, 
            timeZone: "Asia/Jakarta",
          },
          recurrence: [`RRULE:FREQ=WEEKLY;BYDAY=${daysArray.join(",")};`],
        };

        break;
    }

		const response = await calendar.events.update({
      calendarId: "primary",
			eventId: event_id,
      resource: eventDetails,
    });

    await remindersModel.updateReminder(
      reminders_id,
      name,
      frequency,
      time,
      days,
      date,
    );
    
    res.json({ message: "Reminder updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const deleteReminder = async (req, res) => {
  const { id ,reminders_id } = req.params;
  try {
    const [userTokens] = await usersModel.getRefreshToken(id);
    const [eventId] = await usersModel.getGcrId(reminders_id);

    const event_id = eventId[0].gcr_id;
    if(!event_id){
        console.log(id);
    }

    if (
      !userTokens ||
      userTokens.length === 0 ||
      !userTokens[0].refresh_token
    ) {
      return getAuthUrl(req, res);
    }
    oauth2Client.setCredentials({
      refresh_token: userTokens[0].refresh_token,
    });

    await oauth2Client.refreshAccessToken();

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const response = await calendar.events.delete({
        calendarId: "primary",
        eventId: event_id,
      });
    await remindersModel.deleteReminder(reminders_id);
    res.json({ message: "Reminder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAuthUrl,
  handleAuthCallback,
  getReminders,
  getReminderById,
  addReminder,
  updateReminder,
  deleteReminder,
};
