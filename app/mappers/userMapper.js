const User = require('../models/user');

const db = require('../db');

const userMapper = {

    addUser: async (newUser) => {
        
        const result = await db.query(`
        INSERT INTO "user" ("email", "firstname", "lastname", "token", "category")
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`, 
        [newUser.email, newUser.firstname, newUser.lastname, newUser.token, newUser.category]
        );
        return result.rows[0];

    },

    getAllUsers: async () => {
        const result = await db.query(`
        SELECT u.id, u.email, u.firstname, u.lastname, u.category, u.created_at, u.updated_at
        FROM "user" u
        ORDER BY u.lastname`);

        return result.rows.map(member => new User(member))
    },

    getUserById: async (id) => {
        const result = await db.query(`
        SELECT u.id, u.email, u.firstname, u.lastname, u.category, u.created_at, u.updated_at
        FROM "user" u
        WHERE id = $1`, [id])

        if(!result.rows[0]) {

            throw new Error(`Cet id ne correspond à aucun utilisateur.`);
        }
        
        return new User(result.rows[0])

    },

    getUserByEmail: async (email) => {
        const result = await db.query(`
        SELECT u.id, u.email, u.firstname, u.lastname, u.category, u.created_at, u.updated_at
        FROM "user" u
        WHERE email = $1`, [email])

        if(!result.rows[0]) {

            return;
        }
        
        return new User(result.rows[0])

    },

    getUsersByEventId: async (eventId) => {
        const result = await db.query(`
        SELECT u.id, u.email, u.firstname, u.lastname, u.category
        FROM "attendance" a
        LEFT JOIN "user" u ON a.user_id = u.id
        WHERE a.event_id = $1`, [eventId])

        if(!result.rows[0]) {

            return;
        }
        
        return result.rows.map(user => new User(user))

    },

    //setNewToken

    editUser: async (user) => {
        const result = await db.query(`
        UPDATE "user"
        SET email = $1,
        firstname = $2,
        lastname = $3,
        category = $4,
        updated_at = now()
        WHERE id = $5
        RETURNING *;`
        , [user.email, user.firstname, user.lastname, user.category, user.id]
        )

        return new User(result.rows[0])
    },

    deleteUser : async (id) => {

       result = await db.query(`
            DELETE FROM "user"
            WHERE id = $1 RETURNING *`, [id]);

        if (!result.rows[0]) {
            throw new Error(`Cet id ne correspond à aucun utilisateur.`);
        }
        
        return new User(result.rows[0]);

    }
};

module.exports = userMapper;