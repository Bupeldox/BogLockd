

export default class Reservation{
    /**
     * 
     * @param {Door} door 
     * @param {User} user 
     * @param {number} createdDate //mins
     */
    constructor(door,user,createdDate){
        this.door = door;
        this.user = user;
        this.createdDate = createdDate;//mins
    }
}