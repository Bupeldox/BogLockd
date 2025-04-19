
class User{
    constructor(req){
        this.id = req.sessionID;
    }
}

module.exports = User