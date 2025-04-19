

function login(req,res){
    return res.render("login")
}
function register(req,res){
  return res.render("login")
}

  
  
  module.exports = {
    get:{
      index:login,
      register
    },
    post:{

    }
  }