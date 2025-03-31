const loginEndpoint = require("./endpoints/login.js")



module.exports = function(app){
  app.get('/', (req, res) => {
    res.render('home',{data:{session:req.session}});
  })
  
  loginEndpoint(app);
  
  app.get('/auth/register', (req, res) => {
    res.render('register');
  })
  app.get('/pricing', (req, res) => {
    res.render('pricing');
  })
}