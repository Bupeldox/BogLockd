import Door from "../Door/Door.js";
import GetReservationTimingInfoUseCase from "./GetReservationTimingUseCase.js";
import Reservation from "./Reservation.js";


export default class ReservationPresenter{
    /**
     * 
     * @param {import("express").Response} res 
     * @param {GetReservationTimingInfoUseCase} getReservationTimingUseCase 
     */
    constructor(res,getReservationTimingUseCase){
        this.res = res;
        this.getReservationTimingUseCase = getReservationTimingUseCase;
    }
    /**
     * 
     * @param {Reservation} reservation 
     */
    present(reservation){
        
    }
    alreadyHasReservation(reservation){

    }
    updateTimes(){

    }

}