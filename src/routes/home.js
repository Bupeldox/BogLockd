const DataStore = require("../Database/Store");


const dataStore = new DataStore("doors");


function index(req,res,viewLoc){
  console.log("home");
  res.render(viewLoc,{data:{session:req.session}});
}

function pricing(req,res,viewLoc){
  console.log("pricing");
  res.render(viewLoc)
}

  
  
  module.exports = {
    get:{
      index,
      pricing
    }
  }
  