const DataStore = require("../Database/Store");


const dataStore = new DataStore("doors");


function locked(req,res,viewLoc){
  console.log("locked");
  res.render(viewLoc)
}

function unlocked(req,res,viewLoc){
  console.log("unlocked");
  res.render(viewLoc)
}
  
  
  module.exports = {
    get:{
      locked,
    },
    post:{
      unlocked,
    }
  }