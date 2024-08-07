const express = require('express')
const app = express()
const port = 80

const getTrains = require('./get_trains')

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.use(express.static('public'));

app.set('views', './views')

app.set('view engine', 'pug')

app.get('/page', (req, res) => {
  getTrains().then((data) => {
    res.render('index', { trains: data })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})