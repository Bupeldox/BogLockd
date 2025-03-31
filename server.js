


const express = require('express')
const app = express()
const port = 3000
const path = require("path")

const { engine } = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")))

helpers:{
  url:()=>{return "https://awesome-grand-rubidium.glitch.me/"}
  
}

app.set('view engine', '.hbs');
app.set('views', "views");
app.engine('.hbs', engine({extname: '.hbs'}));

app.get('/', (req, res) => {
  res.render('home');
})
app.get('/auth/login', (req, res) => {
  res.render('login');
})
app.get('/auth/register', (req, res) => {
  res.render('register');
})
app.get('/pricing', (req, res) => {
  res.render('pricing');
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})