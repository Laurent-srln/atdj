class Event {
    id;
    name;
    startDateTime;
    endDateTime;
    description;
    createdBy;
    createdAt;
    updatedAt;

    set start_date_time(val){
        this.startDateTime = val;
    }

    set end_date_time(val){
        this.endDateTime = val;
    }

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