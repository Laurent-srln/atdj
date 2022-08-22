class Attendance {
    id;
    eventId;
    userId;
    paymentVerification;
    createdAt;
    updatedAt;

    set event_id(val){
        this.eventId = val;
    }

    set user_id(val){
        this.userId = val;
    }

    set payment_verification(val){
        this.paymentVerification = val;
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

module.exports = Attendance;