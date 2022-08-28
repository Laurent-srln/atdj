const gameMapper = require('../mappers/gameMapper');
const jsonwebtoken = require('jsonwebtoken');

const gameController = {

    addGame : async (req, res) => {

        try {
        
        let game = req.body;
        let { userId : createdBy } = jsonwebtoken.decode(req.headers.authorization.substring(7));
        game.createdBy = Number(createdBy);

        if (!game.boardgameId || !game.date) {
            res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
            return;
        }

        const newGame = await gameMapper.addGame(game);

        res.status(200).json({"message": "La partie a bien été ajoutée.", "newGame": newGame})
    } catch(err) {
        res.status(400).json({"message": err.message});
    }

    }

};


module.exports = gameController