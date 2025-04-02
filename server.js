


const express = require('express')
const app = express()
const port = 3000
const path = require("path")
var session = require('express-session')



const { engine } = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")))

helpers:{
  url:()=>{return "https://boglockd.glitch.me/"}
  
}

app.set('view engine', '.hbs');
app.set('views', "views");
app.engine('.hbs', engine({extname: '.hbs'}));

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  cookie: { secure: true, maxAge: 60000 },
  genid: function(req) {
    return Math.random()+"id" // use UUIDs for session IDs;
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
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})