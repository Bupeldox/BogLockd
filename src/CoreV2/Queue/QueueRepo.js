import Queue from "./Queue.js";



export default class QueueRepo{

    constructor(door,queue){
        this.door = door;
        this.queue = queue;
    }
    /**
     * 
     * @param {Door} door 
     * @returns {Queue}
     */
    getForDoor(door){
        return this.queue;
    }

}