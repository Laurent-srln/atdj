class Boardgame {
    id;
    name;
    description;
    duration;
    minPlayers;
    maxPLayers;
    quantity;
    createdAt;
    updatedAt;

    set min_player(val){
        this.minPlayers = val;
    }

    set max_player(val){
        this.maxPlayers = val;
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

module.exports = Boardgame;