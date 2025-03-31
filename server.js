


const express = require('express')
const app = express()
const port = 3000
const path = require("path")
var session = require('express-session')



const { engine } = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")))

helpers:{
  url:()=>{return "https://awesome-grand-rubidium.glitch.me/"}
  
}

app.set('view engine', '.hbs');
app.set('views', "views");
app.engine('.hbs', engine({extname: '.hbs'}));

const routing = require("./src/routing.js");
routing(app);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})