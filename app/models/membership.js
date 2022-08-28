class Membership {
    id;
    userId;
    startDate;
    endDate;
    createdBy;
    createdAt;
    updatedAt;

    set user_id(val){
        this.userId = val;
    }

    set start_date(val){
        this.startDate = val;
    }

    set end_date(val){
        this.endDate = val;
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

module.exports = Membership;