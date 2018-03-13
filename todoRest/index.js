const express = require('express')
var app = express()
const PORT = process.env.PORT || 3000

var todo = [{
  name: 'olaf',
  age: 15,
  sex: 'M'
}, {
  name: 'teste',
  age: 19,
  sex: 'F'
}]

app.get('/todos', function (req, res) {
  res.send(JSON.stringify(todo))
})

app.listen(PORT, function () {
  console.log('Server start on', PORT)
})
