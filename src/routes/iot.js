const DataStore = require("../Database/Store");
const fs = require("node:fs");

const dataStore = new DataStore("doors");

var lastDate = false;
var isLocked = true;


function save(locked,date){
  var obj = {locked,date};
  fs.writeFileSync("./Data/test.json",JSON.stringify(obj));
}
function read(){
  var str = fs.readFileSync("./Data/test.json").toString();
  var obj = JSON.parse(str);
  return obj
}

function locked(req, res, viewLoc) {
  console.log("locked");
  res.write("recorded lock " + new Date().toString());
  res.end();
  isLocked = true;
  lastDate = new Date()
  save(isLocked,lastDate);
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
  save(isLocked,lastDate);
}

function state(req, res, viewLoc) {
  var {locked,date} = read();
  res.write("state: locked:"+(locked?"true":"false")+ " date:"+date);
  res.end();
}


module.exports = {
  get: {
    locked,
    unlocked,
    state
  },
}