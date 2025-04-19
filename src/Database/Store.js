

const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");

class DataStore{
    static stores = {};
    constructor(storeName){
        if(DataStore.stores.hasOwnProperty(storeName)){
            return DataStore.stores[storeName];
        }
        
        this.fileDir = path.resolve("Data",storeName+".json");
        var data = this._readFile();
        this.fields = data.fields;

        DataStore.stores[storeName] = this;
    }
    _readFile(){
        var str = readFileSync(this.fileDir).toString();
        var data = JSON.parse(str);
        return data;
    }
    _writeFile(data){
        var stored = this._readFile();
        stored.data = data;
        writeFileSync(this.fileDir,JSON.stringify(stored));
    }
    getAll(){
        return this._readFile().data;
    }
    add(record){
        this.validateFields(record);
        var all = this.getAll();
        all.push(record);
        this._writeFile(all);
    }
    update(id,record){
        record.id = id;
        this.validateFields(record);
        var all = this.getAll();
        var toUpdateIndex = all.findIndex(i=>i.id == id);
        all[toUpdateIndex] = record;
        this._writeFile(all);
    }
    delete(id){
        var all = this.getAll();
        var toUpdateIndex = all.findIndex(i=>i.id == id);
        if(toUpdateIndex===-1){
            return false;//doesnt exist
        }
        all.splice(toUpdateIndex,1);
        this._writeFile(all);
    }
    validateFields(obj){
        for(var i in obj){
            if(!this.fields.includes(i)){
                throw "not allowed to store this field in file";
            }
        }
    }
}

module.exports = DataStore;