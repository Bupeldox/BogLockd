
try{ require("./test.secret.js"); }catch(e){}
const express = require('express')
const app = express()
const path = require("path")
var session = require('express-session')
const bodyParser = require('body-parser')


const { engine } = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")))

helpers:{
  url:()=>{return process.env.url}
}

app.set('view engine', '.hbs');
app.set('views', "views");
app.engine('.hbs', engine({extname: '.hbs'}));

app.set('trust proxy', 1)
app.use(session({
  secret: process.env.sessionsSecret,
  cookie: { 
    sameSite:"strict"
  },
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const routing = require("./src/routing.js");
routing(app);

app.get('/test', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html')
  if (req.session.views) {
    req.session.views++  
  } else {
    req.session.views = 1
    res.write('welcome to the session demo. refresh!')
  }
  res.write('<p>views: ' + JSON.stringify(req.session) + '</p>')
  res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
  res.write('<p>secret: ' + process.env.testSecret + '</p>')
  res.write('<p>secret: ' + JSON.stringify(req.body) + '</p>')
  res.write('<p>secret: ' + JSON.stringify(req.sessionID) + '</p>')
  res.end()
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})