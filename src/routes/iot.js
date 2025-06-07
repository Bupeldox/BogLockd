const DataStore = require("../Database/Store");


const dataStore = new DataStore("doors");

var lastDate = false;
var isLocked = true;

function locked(req, res, viewLoc) {
  console.log("locked");
  res.write("recorded lock " + new Date().toString());
  res.end();
  isLocked = true;
  lastDate = new Date()
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} viewLoc 
 */
function unlocked(req, res, viewLoc) {
  console.log("unlocked");
  res.write("recorded unlock " + new Date().toString());
  res.end();
  isLocked = false;
  lastDate = new Date();
}

function state(req, res, viewLoc) {
  res.write("state: locked:"+(isLocked?"true":"false")+ " date:"+lastDate);
  res.end();
}


module.exports = {
  get: {
    locked,
    unlocked,
    state
  },
}