const settings={
    closedTimeout:30,//mins
}


class Door{
    constructor({id,lastUnlocked,lastLocked}){
        //default to open
        this.id = id;
        this.lastUnlocked = lastUnlocked;
        this.lastLocked = lastLocked;
    }
    isOpen(){
        return this.lastOpened>this.lastClosed;
    }
    isErronious(){
        var now = new Date(Date.now());
        return
            !this.isOpen() && this.lastClosed<(now.setMinutes(now.getMinutes()+settings.closedTimeout));

    }
}