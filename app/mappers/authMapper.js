const db = require('../db');

const authMapper = {

    getToken : async (token) => {

        result = await db.query(`
        
        SELECT id
        FROM "user"
        WHERE "token" = $1`,
        [token]
        );

        return result.rows[0];
    },

    getUserAuthInfo : async (email) => {

        const result = await db.query(`
        SELECT u.id, u.email, u.password, u.category
        FROM "user" u
        WHERE lower(email) = $1;`,
        [email.toLowerCase()]
        )
        return result.rows[0];
    },

    setPassword : async (token, password) => {

        await db.query(`

        UPDATE "user"
        SET password = $1, token = NULL, updated_at = now()
        WHERE "token" = $2`,
        [password, token]
        )
    },

    setNewToken : async (email, token) => {

        await db.query(`
        UPDATE "user"
        SET token = $1, updated_at = now()
        WHERE email = $2;`, [token, email])

        return;
    }

}

module.exports = authMapper;