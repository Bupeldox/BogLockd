


const express = require('express')
const app = express()
const port = 3000
const path = require("path")

const { engine } = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")))



app.set('view engine', '.hbs');
app.set('views', "views");
app.engine('.hbs', engine({extname: '.hbs'}));

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})