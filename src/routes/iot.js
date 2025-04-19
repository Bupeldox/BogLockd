const DataStore = require("../Database/Store");


const dataStore = new DataStore("doors");


function locked(req,res){
  console.log("locked");
}

function unlocked(req,res){
  console.log("unlocked");
}
  
  
  module.exports = {
    get:{
      locked,
    },
    post:{
      unlocked,
    }
  }