



function index(req,res){

  res.render('reserve/index');
}

function reserve(req,res){
  //asap always takes 5 mins to encourage subscription
  res.render('reserve/complete');
}
  
  
module.exports = {
    get:{
        index,
        reserve
    }
}