const DataStore = require("../Database/Store");


const dataStore = new DataStore("doors");


function index(req,res){
  console.log("home");
  res.render('home',{data:{session:req.session}});
}

function pricing(req,res){
  console.log("pricing");
    return res.render("pricing");
}

  
  
  module.exports = {
    get:{
      index,
      pricing
    }
  }
  