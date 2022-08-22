const boardgameMapper = require('../mappers/boardgameMapper');

const boardgameController = {

    addBoardgame: (req,res) => {

    boardgame = req.body;

    if (!boardgame.name || !boardgame.description || !boardgame.duration || !boardgame.min_players || !boardgame.max_players || !boardgame.quantity) {
        res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
        return;
    }

    try {

    }
    }

};


module.exports = boardgameController