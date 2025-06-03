

export default class ReservationTiming{
    constructor(start,duration){
        this.start = start;
        this.duration = duration;
    }
    getEnd(){
        return this.start + this.duration;
    }
}