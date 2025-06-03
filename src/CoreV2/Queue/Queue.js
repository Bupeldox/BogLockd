

export default class Queue{
    constructor(door){
        this.queue = [];
    }
    
    push(user){
        this.queue.push(user);
    }

    pop(){
        return this.queue.shift();
    }
    getPositionOfUserInQueue(user){
        return this.queue.indexOf(user);
    }
}