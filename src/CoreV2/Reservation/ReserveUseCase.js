



// get reservation 
// show their reservation

import QueueRepo from "../Queue/QueueRepo.js";
import SettingsRepo from "../SettingsRepo.js";
import TimingHelper from "../TimingHelper.js";
import Reservation from "./Reservation.js";
import ReservationPresenter from "./ReservationPresenter.js";
import ReservationRepo from "./ReservationRepo.js";





export default class ReserveUseCase{
    /**
     * 
     * @param {ReservationPresenter} presenter 
     * @param {ReservationRepo} reservationDataStore 
     * @param {SettingsRepo} settingsRepo 
     * @param {QueueRepo} queueRepo
     */
    constructor(presenter,reservationDataStore,settingsRepo,queueRepo){
        this.presenter  = presenter;
        this.reservationDataStore = reservationDataStore;
        this.settingsRepo = settingsRepo;
        this.queueRepo = queueRepo;
    }
    execute(door,user){
        var existingReservation = this.reservationDataStore.getByDoorAndUserId(door,user);
        if(existingReservation){
            this.presenter.alreadyHasReservation(existingReservation);
            return;
        }

        var newReservation = new Reservation(door,user,TimingHelper.DateToMins(new Date()));
        
        var queue = this.queueRepo.getForDoor(door)
        this.queueRepo.addReservationToQueue(queue,newReservation);

        this.presenter.present(newReservation);
    }
}