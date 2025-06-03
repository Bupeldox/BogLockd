

export default class Door{
    constructor(id){
        this.id = id;
        this.isOpen = true;
    }
    open(){
        this.isOpen = true;
    }
    close(){
        this.isOpen = false;
    }
}