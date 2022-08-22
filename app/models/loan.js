class Loan {
    id;
    userId;
    boardgameId;
    loanDate;
    returnDate;
    returnBy;
    createdAt;
    updatedAt;

    set user_id(val){
        this.userId = val;
    }

    set boardgame_id(val){
        this.boardgameId = val;
    }

    set loan_date(val){
        this.loanDate = val;
    }

    set return_date(val){
        this.returnDate = val;
    }

    set return_by(val){
        this.returnBy = val;
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

module.exports = Loan;