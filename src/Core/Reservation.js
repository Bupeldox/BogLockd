

class Reservation{
    constructor(userId,start,duration){
        this.userId = userId;
        this.start= start;//utc
        this.duration= duration;//mins
    }
}

module.exports = Reservation;
