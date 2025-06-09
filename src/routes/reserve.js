const reservationSystem = require("../Core/ReservationSystem.js");
const settings = require("../Core/Settings.js");
const User = require("../Core/User.js");



function index(req,res,viewLoc){
  var user = new User(req);
  var reservation = reservationSystem.nextReservation(user.id,new Date());
  var error = req.query.error;
  if(reservation){
    res.render("reserve/viewReservation",{
      reservation,
      startTimeTicks: +new Date(reservation.start),
      error
    })
  }
  else{
    res.render("reserve/reserve",{
      error
    })
  }
}



function reserve(req,res,viewLoc){
  var form = {
    when:req.body.when?new Date(req.body.when):false,
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
  
function cancel(req,res,viewLoc){
  var user = new User(req);
  var err = reservationSystem.cancelNext(user.id,new Date());

  if(err){
    res.redirect("/reserve?error="+err);
    return
  }
  res.redirect("/reserve?error=Reservation Canceled");

}


  
module.exports = {
    get:{
        index,
        cancel
    },
    post:{
      index:reserve
    }
}