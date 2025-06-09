import ReservationPresenter from "../Reservation/ReservationPresenter.js";
import TimingHelper from "../TimingHelper.js";
import DoorRepo from "./DoorRepo.js";


export default class DoorUnlockUseCase{
    /**
     * 
     * @param {ReservationPresenter} reservationPresenter 
     * @param {DoorRepo} doorRepo 
     */
    constructor(reservationPresenter,doorRepo){
        this.reservationPresenter = reservationPresenter;
        this.doorRepo = doorRepo;
    }
    execute(door){

        this.doorRepo.updateUnlocked(door,TimingHelper.DateToMins(new Date()))
        //update door
        
        //present update
    }
}