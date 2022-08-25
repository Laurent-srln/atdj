const Event = require('../models/event');

const db = require('../db');

const eventMapper = {

    addEvent : async ({name, startDateTime, endDateTime, description, createdBy}) => {

        const result = await db.query(`
        INSERT INTO "event" ("name", "start_date_time", "end_date_time", "description", "created_by")
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [name, startDateTime, endDateTime, description, createdBy] 
        );

        return new Event(result.rows[0]);

    },

    getAllEvents : async () => {

        const result = await db.query(`
        SELECT e.id, e.name, e.start_date_time, e.end_date_time, e.description
        FROM event e;`);

        return result.rows.map(event => new Event(event));
    },

    getEventById : async (eventId) => {

        const result = await db.query(`
        SELECT e.id, e.name, e.start_date_time, e.end_date_time, e.description
        FROM event e
        WHERE e.id = $1;`, [eventId])

        if (!result.rows[0]) {
            throw new Error(`Cet id ne correspond à aucun évènement.`);
        }

        return new Event(result.rows[0]);
    },

    // getAllUsersByEventId

    editEvent : async ({ id, name, startDateTime, endDateTime, description, updatedBy }) => {

        const result = await db.query(`
        UPDATE "event"
        SET name = $2, start_date_time = $3, end_date_time = $4, description = $5, updated_by = $6
        WHERE id = $1
        RETURNING *;`, [id, name, startDateTime, endDateTime, description, updatedBy])

        if (!result.rows[0]) {
            throw new Error(`Cet id ne correspond à aucun évènement.`);
        }

        return new Event(result.rows[0]);
    },

    deleteEvent : async (id) => {
        const result = await db.query(`
        DELETE FROM "event"
        WHERE id = $1
        RETURNING *;`, [id])

        
        if (!result.rows[0]) {
            throw new Error(`Cet id ne correspond à aucun évènement.`);
        }

        return new Event(result.rows[0]);
        
    }

    
};

module.exports = eventMapper;