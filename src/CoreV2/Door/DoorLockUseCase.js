


export default class DoorLockUseCase{
    /**
     * 
     * @param {DoorRepo} doorRepo 
     * @param {ReservationPresenter} reservationPresenter
     */
    constructor(doorRepo,reservationPresenter){
        this.doorRepo = doorRepo;
        this.reservationPresenter = reservationPresenter;
    }
    
    execute(doorId){    
       this.doorRepo.
        //update door
        //update estimates
    }   
}