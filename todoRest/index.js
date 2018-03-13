var express = require('express')
const helmet = require('helmet')
var app = express()

app.use(helmet())
const PORT = process.env.PORT || 3000

var todos = [{
  id: 1,
  description: "Meer mom for launch",
  completed: false
}, {
  id: 2,
  description: "Go to market",
  completed: false
}, {
  id: 3,
  description: "Go to college",
  completed: true
}
]

app.get('/todos', function (req, res) {
  console.log('REQUEST => ', req.connection.remoteAddress, ' Date => ', new Date().toString())
  res.send(JSON.stringify(todos))
})

app.get('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id)
  var todoMached;
  todos.forEach(function (unique) {
    if (unique.id === todoId) {
      todoMached = unique
    }
  })
  if (todoMached) {
    res.json(todoMached)
  } else {
    res.status(404).send()
  }
})

app.listen(PORT, function () {
  console.log('Server start on', PORT)
})
