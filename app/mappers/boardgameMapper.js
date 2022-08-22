const Boardgame = require('../models/boardgame');

const db = require('../db');

const boardgameMapper = {

    addBoardgmae : ({name, description, duration, min_players, max_players, quantity}) => {
        const result = await db.query(`
        INSERT INTO "boardgame" ("name", "description", "duration", "min_players", "max_players", "quantity")
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [name, description, duration, min_players, max_players, quantity] 
        );

        return result.rows[0];
    }

    
};

module.exports = boardgameMapper;