const Event = require('../models/event');

const db = require('../db');

const eventMapper = {

    addEvent : async ({name, startDateTime, endDateTime, description, createdBy}) => {

        const result = await db.query(`
        INSERT INTO "event" ("name", "start_date_time", "end_date_time", "description", "created_by")
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [name, startDateTime, endDateTime, description, createdBy] 
        );

        return new Event(result.rows[0]);

    }

    // getAllEvents

    // getEventById

    // getAllUsersByEventId

    // editEvent

    // deleteEvent

    
};

module.exports = eventMapper;