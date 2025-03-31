

function get(req,res){
  return res.render("login")
}
function post(req,res){
  
}


module.exports = function(app){
  app.get("auth/login",(req,res)=>get(req,res))
  app.post("auth/login",post)
}