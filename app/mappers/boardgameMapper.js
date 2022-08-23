const Boardgame = require('../models/boardgame');

const db = require('../db');

const boardgameMapper = {

    addBoardgame : async ({name, description, duration, minPlayers, maxPlayers, quantity}) => {
        const result = await db.query(`
        INSERT INTO "boardgame" ("name", "description", "duration", "min_players", "max_players", "quantity")
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [name, description, duration, minPlayers, maxPlayers, quantity] 
        );

        return result.rows[0];
    },

    getAllBoardgmaes : async () => {
        const result = await db.query(`
        SELECT b.id, b.name, b.description, b.duration, b.min_players, b.max_players, b.quantity
        FROM boardgame b
        ORDER by name;`);

        return result.rows.map(boardgame => new Boardgame(boardgame));
    },

    getBoardgameById : async (boardgameId) => {
        const result = await db.query(`
        SELECT b.id, b.name, b.description, b.duration, b.min_players, b.max_players, b.quantity
        FROM boardgame b
        WHERE b.id = $1;`, [boardgameId]);

        if(!result.rows[0]) {

            throw new Error(`Cet id ne correspond à aucun jeu.`);
        }

        return new Boardgame(result.rows[0]);
    },

    editBoardgame : async ({id,name, description, duration, minPlayers, maxPlayers, quantity}) => {
        const result = await db.query(`
        UPDATE "boardgame"
        SET name = $1,
        description = $2,
        duration = $3,
        min_players = $4,
        max_players = $5,
        quantity = $6,
        updated_at = now()
        WHERE id = $7
        RETURNING *;`
        , [name, description, duration, minPlayers, maxPlayers, quantity, id]
        )

        if(!result.rows[0]) {

            throw new Error(`Cet id ne correspond à aucun jeu.`);
        }

        return new Boardgame(result.rows[0])

    },

    deleteBoardgame : async (id) => {
        const result = db.query(`
        DELETE FROM "boardgame"
        WHERE id = $1
        RETURNING *;`, [id]
)

        return;
    }

    
};

module.exports = boardgameMapper;