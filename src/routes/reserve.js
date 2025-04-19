const reservationSystem = require("../Core/ReservationSystem.js");
const settings = require("../Core/Settings.js");
const User = require("../Core/User.js");



function index(req,res,viewLoc){
  var user = new User(req);
  var reservation = reservationSystem.nextReservation(user.id,new Date());
  var error = req.params.error;
  if(reservation){
    res.render("reserve/viewReservation",{
      reservation,
      error
    })
  }
  else{
    res.render("reserve/reserve",{
      error
    })
  }
}

function parseTime( t ) {
  var d = new Date();
  var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
  d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
  d.setMinutes( parseInt( time[2]) || 0 );
  return d;
}
function reserve(req,res,viewLoc){
  var form = {
    when:req.body.when?parseTime(req.body.when):false,
    asap:req.body.asap
  }

  if(!form.asap){
    throw "no asap :(";
  }

  form.asap = form.asap == "asap";

  if(!form.asap && !form.when){
    throw "no time :(";
  }

  var searchFromTime;
  if(form.asap){
    searchFromTime = new Date();
  }else{
    searchFromTime = new Date(form.when);
  }


  if(true/* session not registered */){
    var minTime = new Date();
    minTime.setMinutes(minTime.getMinutes()+settings.encouragementPeriod);
    if(searchFromTime<minTime){
      searchFromTime = minTime;
    }
  }

  var user = new User(req);
  var newReservation = reservationSystem.reserveAt(user.id,searchFromTime)
  if(newReservation.error){
    res.redirect("/reserve?error="+newReservation.error)
    return;
  }

  res.redirect("/reserve");
}
  
  
module.exports = {
    get:{
        index
    },
    post:{
      index:reserve
    }
}