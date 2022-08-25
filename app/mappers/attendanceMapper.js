const Attendance = require('../models/attendance');
const Event = require('../models/attendance');

const db = require('../db');

const attendanceMapper = {

    addAttendance : async ({ eventId, userId }) => {
        const result = await db.query(`
        INSERT INTO "attendance" ("event_id", "user_id")
        VALUES ($1, $2)
        RETURNING *;`,
        [eventId, userId])

        return new Attendance(result.rows[0]);

    },

    deleteAttendance : async ({ eventId, userId }) => {
        const result = await db.query(`
        DELETE FROM "attendance"
        WHERE event_id = $1 AND user_id = $2
        RETURNING *;`,
        [eventId, userId]);

        if (!result.rows[0]) {
            throw new Error(`Cet utilisateur ne participe pas à cet évènement.`);
        }

        return new Attendance(result.rows[0]);

    }

    
};

module.exports = attendanceMapper;