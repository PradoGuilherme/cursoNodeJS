var express = require('express')
const helmet = require('helmet')
var app = express()

app.use(helmet())
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
  console.log('REQUEST => ', req.connection.remoteAddress, ' Date => ', new Date().toString())
  res.send(JSON.stringify(todo))
})

app.listen(PORT, function () {
  console.log('Server start on', PORT)
})
