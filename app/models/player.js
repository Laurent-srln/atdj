class Player {
    id;
    gameId;
    userId;
    winner;
    createdAt;
    updatedAt;

    set game_id(val){
        this.gameId = val;
    }

    set user_id(val){
        this.userId = val;
    }

    set created_at(val){
        this.createdAt = val;
    }

    set updated_at(val){
        this.updatedAt = val;
    }

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Player;