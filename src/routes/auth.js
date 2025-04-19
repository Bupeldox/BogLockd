

function login(req,res,viewLoc){
    return res.render(viewLoc)
}
function register(req,res,viewLoc){
  return res.render(viewLoc)
}

  
  
  module.exports = {
    get:{
      index:login,
      register
    },
    post:{

    }
  }