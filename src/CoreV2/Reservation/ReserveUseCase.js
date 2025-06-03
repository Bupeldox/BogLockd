



// get reservation 
// show their reservation

import SettingsRepo from "../SettingsRepo.js";
import Reservation from "./Reservation.js";
import ReservationPresenter from "./ReservationPresenter.js";
import ReservationRepo from "./ReservationRepo.js";





export default class ReserveUseCase{
    /**
     * 
     * @param {ReservationPresenter} presenter 
     * @param {ReservationRepo} reservationDataStore 
     * @param {SettingsRepo} settingsRepo 
     */
    constructor(presenter,reservationDataStore,settingsRepo){
        this.presenter  = presenter;
        this.reservationDataStore = reservationDataStore;
        this.settingsRepo = settingsRepo;
    }
    execute(door,user,nowTime){
        var existingReservation = this.reservationDataStore.getByDoorAndUserId(door,user);
        if(existingReservation){
            this.presenter.alreadyHasReservation(existingReservation);
            return;
        }

        var newReservation = new Reservation(door,user);
        
        this.presenter.present()
    }
}