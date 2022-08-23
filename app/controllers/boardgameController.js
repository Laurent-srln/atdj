const boardgameMapper = require('../mappers/boardgameMapper');

const boardgameController = {

    addBoardgame: async (req,res) => {

    boardgame = req.body;

    if (!boardgame.name || !boardgame.description || !boardgame.duration || !boardgame.minPlayers || !boardgame.maxPlayers || !boardgame.quantity) {
        res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
        return;
    }

    if (isNaN(boardgame.duration) || isNaN(boardgame.minPlayers) || isNaN(boardgame.minPlayers) || isNaN(boardgame.quantity)) {
        res.status(400).json({"message": `La durée, le nombre de joueurs et la quantité doivent être des nombres.`});
        return;
    }

    if (boardgame.duration < 1) {
        res.status(400).json({"message": `La durée de jeu doit être supérieure à 0.`});
        return;
    }

    if (boardgame.quantity < 0) {
        res.status(400).json({"message": `La quantité ne peut pas être négative.`});
        return;
    }

    if (boardgame.min_players < 1 || boardgame.max_players < 1) {
        res.status(400).json({"message": `Le nombre de joueurs ne peut pas être inférieur à 1.`});
        return;
    }

    if (boardgame.minPlayers > boardgame.maxPlayers) {
        res.status(400).json({"message": `Le nombre maximum de joueurs doit être supérieur ou égal au nombre inférieur de joueurs.`});
        return;
    }

    try {

        const newBoardgame = await boardgameMapper.addBoardgame(boardgame);

        res.status(200).json({"message": `Le jeu a bien été ajouté.`, "newBoardgame":  newBoardgame});

    } catch(err) {
        res.status(400).json({"message": err.message})
    }
    },

    getAllBoardgames: async (req, res) => {
        try {
        const boardgames = await boardgameMapper.getAllBoardgmaes();
        res.status(200).json(boardgames)
        } catch(err) {
            res.status(400).json({"message": err.message})
        }
    },

    getABoardgameById: async (req, res) => {
        boardgameId = req.params.id;
        try {
        const boardgame = await boardgameMapper.getBoardgameById(boardgameId);
        res.status(200).json(boardgame)
        } catch(err) {
            res.status(400).json({"message": err.message})
        }
    },

    editBoardgame: async (req,res) => {
        const id = Number(req.params.id);
        let boardgame = req.body;
        boardgame.id = id;

    
        if (!boardgame.name || !boardgame.description || !boardgame.duration || !boardgame.minPlayers || !boardgame.maxPlayers || !boardgame.quantity) {
            res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
            return;
        }
    
        if (isNaN(boardgame.duration) || isNaN(boardgame.minPlayers) || isNaN(boardgame.minPlayers) || isNaN(boardgame.quantity)) {
            res.status(400).json({"message": `La durée, le nombre de joueurs et la quantité doivent être des nombres.`});
            return;
        }
    
        if (boardgame.duration < 1) {
            res.status(400).json({"message": `La durée de jeu doit être supérieure à 0.`});
            return;
        }
    
        if (boardgame.quantity < 0) {
            res.status(400).json({"message": `La quantité ne peut pas être négative.`});
            return;
        }
    
        if (boardgame.min_players < 1 || boardgame.max_players < 1) {
            res.status(400).json({"message": `Le nombre de joueurs ne peut pas être inférieur à 1.`});
            return;
        }
    
        if (boardgame.minPlayers > boardgame.maxPlayers) {
            res.status(400).json({"message": `Le nombre maximum de joueurs doit être supérieur ou égal au nombre inférieur de joueurs.`});
            return;
        }
    
        try {
    
            const modifiedBoardgame = await boardgameMapper.editBoardgame(boardgame);
    
            res.status(200).json({"message": `Le jeu a bien été modifié.`, "newBoardgame":  modifiedBoardgame});
    
        } catch(err) {
            res.status(400).json({"message": err.message})
        }
        },

        deleteBoardgame : async (req, res) => {
            let id = Number(req.params.id);

            try {
                const deletedBoardgame = await boardgameMapper.getBoardgameById(id)
                await boardgameMapper.deleteBoardgame(id);

                res.status(400).json({"message": "Le jeu a bien été supprimé.", "deletedBoardgame": deletedBoardgame})
            } catch(err) {
                res.status(400).json({"message": err.message});
                }
        } 



};


module.exports = boardgameController