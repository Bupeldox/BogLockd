import QueueRepo from "../Queue/QueueRepo.js";
import SettingsRepo from "../SettingsRepo.js";
import TimingHelper from "../TimingHelper.js";
import Reservation from "./Reservation.js";
import ReservationTiming from "./ReservationTiming.js";



export default class GetReservationTimingInfoUseCase{

    /**
     * 
     * @param {QueueRepo} queueRepo 
     * @param {SettingsRepo} settingsRepo 
     */
    constructor(queueRepo,settingsRepo){
        this.queueRepo = queueRepo;
        this.settingsRepo = settingsRepo;
    }

    /**
     * 
     * @param {Reservation} reservation 
     */
    execute(reservation){
        var queue = this.queueRepo.getForDoor(reservation.door);
        var index = queue.getPositionOfUserInQueue(reservation.user);

        let startingFrom,estimate;
        let toiletIsFreeAndForYouToUse = false;
        
        if((!queue.any()||index==0) && !reservation.door.locked){
             TimingHelper.DateToMins(new Date());
             toiletIsFreeAndForYouToUse = true;
             estimate = false;
        }else{
            startingFrom = reservation.door.lastLocked;
            estimate = true;
        }
    
        var delay = (index * (this.settingsRepo.getDurationMins() + this.settingsRepo.getGracePeriodMins()));
        
        return new ReservationTiming(zeroThReservation.createdDate + delay, this.settingsRepo.getDurationMins(),isOnlyOne,estimate);
    }
}