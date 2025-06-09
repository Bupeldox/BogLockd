const DataStore = require("../Database/Store");
const fs = require("node:fs");

const dataStore = new DataStore("doors");


function index(req, res, viewLoc) {
  console.log("home");
  res.render(viewLoc, { data: { session: req.session } });
}

function read() {
  var str = fs.readFileSync("./Data/test.json").toString();
  var obj = JSON.parse(str);
  return obj
}

function isLocked(req, res) {
  var { locked } = read();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ locked: locked }));
}

function pricing(req, res, viewLoc) {
  console.log("pricing");
  res.render(viewLoc)
}



module.exports = {
  get: {
    index,
    pricing,
    isLocked
  }
}
