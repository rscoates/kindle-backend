const express = require('express')
const app = express()
const port = 3000

const getTrains = require('./get_trains')

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