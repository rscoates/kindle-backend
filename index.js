const express = require('express')
const app = express()
const port = 8088

const getTrains = require('./get_trains')
const getRecycling = require('./get_recycling')

app.use((req, res, next) => {
  //console.log(req);
  next();
});

app.use(express.static('public'));

app.set('views', './views')

app.set('view engine', 'pug')

app.get('/page', (req, res) => {
 const d = new Date();
 const hr = d.getHours();
 let min = d.getMinutes();
 if (min < 10) {
    min = "0" + min;
 }
 const date = `${hr}:${min}`
 Promise.all([getTrains(), getRecycling()]).then(([trains, recycling]) => {
    res.render('index', { trains, recycling, date })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
