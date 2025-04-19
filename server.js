
try{ require("./test.secret.js"); }catch(e){}
const express = require('express')
const app = express()
const path = require("path")
var session = require('express-session')



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
  secret: 'keyboard cat',
  cookie: { 
    sameSite:"strict"
  },
}))


const routing = require("./src/routing.js");
routing(app);

app.get('/test', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.write('<p>secret: ' + process.env.testSecret + '</p>')
    res.write('<p>secret: ' + JSON.stringify(req.body) + '</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})