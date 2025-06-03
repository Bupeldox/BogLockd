import DataStore from "../../Database/Store.js";




export default class ReservationRepo{
    constructor(){
        this.datastore = new DataStore("reservations.json");
        
    }
    getByDoorAndUserId(doorId,userId){
        
    }
}