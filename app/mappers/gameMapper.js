const Game = require('../models/game');

const db = require('../db');
const Boardgame = require('../models/boardgame');

const gameMapper = {

    addGame : async ({ boardgameId, date, comment, createdBy }) => {

        const result = await db.query(`
        INSERT INTO "game" ("boardgame_id", "date", "comment", "created_by")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`, [boardgameId, date, comment, createdBy]);

        return new Boardgame(result.rows[0]);
    }



    
};

module.exports = gameMapper;