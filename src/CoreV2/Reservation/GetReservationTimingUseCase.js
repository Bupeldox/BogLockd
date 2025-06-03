import QueueRepo from "../Queue/QueueRepo.js";
import Reservation from "./Reservation.js";



export default class GetReservationTimingInfo{
    /**
     * 
     * @param {QueueRepo} queueRepo 
     */
    constructor(queueRepo){
        this.queueRepo = queueRepo;
    }
    /**
     * 
     * @param {Reservation} reservation 
     */
    execute(reservation){
        var queue = this.queueRepo.getForDoor(reservation.door);
        var index = queue.getPositionOfUserInQueue(reservation.user);
        
    }
}