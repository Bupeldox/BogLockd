import DataStore from "../../Database/Store.js";



class SavedDoor {
    constructor(
        name,
        lastUnlocked,
        lastLocked
     ) {
        this.id = Math.random();

        this.name = name;
        this.lastUnlocked = lastUnlocked;
        this.lastLocked = lastLocked;
    }
}


export default class ReservationRepo {
    constructor() {
        this.datastore = new DataStore("reservations.json");

    }
    getByDoorAndUserId(door, user) {
        this.datastore.getAll().filter(i => i.doorId == doorId)
    }
    addDoor(name) {
        var door = new Door
    }
}