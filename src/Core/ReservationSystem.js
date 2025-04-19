
const DataStore = require("../Database/Store.js");
const settings = require("./Settings.js");
const Reservation = require("./Reservation.js");
const ds = new DataStore("reservations");

function findFirstFreeSlot(periods, requiredMinutes ,startLookingFrom) {
    const requiredMs = requiredMinutes * 60 * 1000;
  
    // Step 1: Normalize and sort the periods by start time
    const sorted = periods
      .map(p => ({ start: p.start, end: p.start + p.duration * 60 * 1000 }))
      .sort((a, b) => a.start - b.start);
  
    // Step 2: Merge overlapping or contiguous periods
    const merged = [];
    for (const period of sorted) {
      if (!merged.length || merged[merged.length - 1].end < period.start) {
        merged.push({ ...period });
      } else {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, period.end);
      }
    }
  
    // Step 3: Look for a gap between periods
    const now = startLookingFrom; // Or you can start from sorted[0].start if you want
    let lastEnd = Math.max(now, merged.length ? merged[0].start : now);
  
    for (let i = 0; i < merged.length; i++) {
      const gap = merged[i].start - lastEnd;
      if (gap >= requiredMs) {
        return { start: lastEnd, end: lastEnd + requiredMs };
      }
      lastEnd = Math.max(lastEnd, merged[i].end);
    }
  
    // Step 4: If no gap found in between, return a slot after the last period
    return { start: lastEnd, end: lastEnd + requiredMs };
  }

class ReservationSystem{
    constructor(){
    }
    _parseTime(timeToday){
        timeToday = new Date(timeToday);
        var searchTime =  new Date(Date.now());
        searchTime.setHours(timeToday.getHours());
        searchTime.setMinutes(timeToday.getMinutes());
        return searchTime
    }
    reserveAt(userId,time){
        if(this.nextReservation(userId,time)){
            return {error: "already has reservation"};
        }
        var data = this._getAllToday();
        var startLookingFrom = this._parseTime(time);
        
        var slot = findFirstFreeSlot(
            data.map(i=>({duration:settings.reserveTimeMins,start:+new Date(i.start)})),
            settings.reserveTimeMins,
            startLookingFrom
        );
        
        //asap always takes 5 mins to encourage subscription
        //res.render(viewLoc)

        var reservation = new Reservation(userId,new Date(slot.start),settings.reserveTimeMins);
        ds.add(reservation);
        
        return reservation;
    }
    _getAllToday(){
        var endOfDay = new Date()
        endOfDay.setHours(24)
        endOfDay.setMinutes(59)

        var startOfDay = new Date();
        startOfDay.setHours(0);
        startOfDay.setMinutes(0);

        var data = ds.getAll();
        return data.filter(i=> startOfDay < new Date(i.start) && new Date(i.start) < endOfDay);
    }
    nextReservation(userId,timeToday){
        var searchTime =  this._parseTime(timeToday);
        searchTime.setMinutes(timeToday.getMinutes()-settings.reserveTimeMins);
        if(isNaN(searchTime.getTime())){
            throw "invalid time";
        }
        var data = this._getAllToday();
        var upComing = data.filter(i=>i.userId == userId && new Date(i.start) > searchTime);
        return upComing[0];
    }

}


const reservationSystem = new ReservationSystem();
module.exports = reservationSystem;