import Reservation from "../Reservation/Reservation.js";


export default class Queue{
    constructor(){
        this.queue = [];
    }
    
    push(reservation){
        this.queue.push(reservation);
    }

    pop(){
        return this.queue.shift();
    }
    getPositionOfUserInQueue(reservation){
        return this.queue.findIndex(i=>i.user == reservation.user);
    }
    /**
     * 
     * @returns {Reservation}
     */
    first(){
        return this.queue[0];
    }
}