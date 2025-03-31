


const express = require('express')
const app = express()
const port = 3000

const { engine } = require("express-handlebars");

app.use(express.static('public'))


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})