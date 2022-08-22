class Event {
    id;
    date;
    description;
    createdBy;
    createdAt;
    updatedAt;

    set created_by(val){
        this.createdBy = val;
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

module.exports = Event;