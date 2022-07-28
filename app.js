const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()

const items = ['Buy Food', 'Coock Food', 'Eat Food']
const workItems = []
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
// Home route
app.get('/', function (req, res) {
  const options = { weekday: 'long', day: 'numeric', month: 'long' }
  const today = new Date()
  const day = today.toLocaleDateString('en-GB', options)
  res.render('index', { listTitle: day, items: items })
})
app.post('/', function (req, res) {
  const item = req.body.listItem
  if (req.body.list === 'Work List') {
    workItems.push(item)
    res.redirect('/work')
  } else {
    items.push(item)
    res.redirect('/')
  }
})
// Second route work
app.get('/work', function (req, res) {
  res.render('index', { listTitle: 'Work List', items: workItems })
})
app.listen(3000, function () {
  console.log('server is running on port 3000.')
})
