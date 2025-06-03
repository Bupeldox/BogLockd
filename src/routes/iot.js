const DataStore = require("../Database/Store");


const dataStore = new DataStore("doors");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {string} viewLoc 
 */
function locked(req,res,viewLoc){
  res.render(viewLoc)
  var doorId = req.params.id
  dataStore.
}

function unlocked(req,res,viewLoc){
  
  res.render(viewLoc)
}
  
  
  module.exports = {
    get:{
      locked,
      unlocked,
    }
  }