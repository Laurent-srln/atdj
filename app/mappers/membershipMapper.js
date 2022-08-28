const Membership = require('../models/membership');

const db = require('../db');

const membershipMapper = {
    addMembership : async (userId, startDate, endDate, createdBy) => {

        const result = await db.query(`
        INSERT INTO "membership" (user_id, start_date, end_date, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`, [userId, startDate, endDate, createdBy]);

        return new Membership(result.rows[0]);
    },

    getAllMemberships : async () => {

        const result = await db.query(`
        SELECT "id", "user_id", "start_date", "end_date", "created_by", "created_at"
        FROM "membership";`)

        return result.rows.map(membership => new Membership(membership));
    },

    getAllValidMemberships : async () => {

        const result = await db.query(`
        SELECT "id", "user_id", "start_date", "end_date", "created_by", "created_at"
        FROM "membership"
        WHERE end_date >= now()
        AND start_date <= now();`)

        return result.rows.map(membership => new Membership(membership));
    },

    getAllMembershipsByUserId : async (userId) => {

        const result = await db.query(`
        SELECT "id", "user_id", "start_date", "end_date", "created_by", "created_at"
        FROM "membership"
        WHERE user_id = $1;`, [userId]);

        return result.rows.map(membership => new Membership(membership));
    },

    getValidMembershipByUserId : async (userId) => {

        const result = await db.query(`
        SELECT "id", "user_id", "start_date", "end_date", "created_by", "created_at"
        FROM "membership"
        WHERE end_date >= now()
        AND start_date <= now()
        AND user_id = $1;`, [userId]);

        return new Membership(result.rows[0]);
    },

    deleteMembership : async (membershipId) => {

        const result = await db.query(`
        DELETE FROM "membership"
        WHERE id = $1
        RETURNING *;`, [membershipId]);

        console.log(result);

        return new Membership(result.rows[0]);
    }
    
};

module.exports = membershipMapper;