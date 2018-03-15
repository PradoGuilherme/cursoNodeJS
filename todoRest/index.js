const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const _ = require('underscore')
var app = express()
var nextTodoId = 1
app.use(helmet())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

var todos = []

app.get('/todos', function (req, res) {
  console.log('REQUEST => ', req.connection.remoteAddress, ' Date => ', new Date().toString())
  res.send(JSON.stringify(todos))
})

app.post('/todos', function (req, res) {
  var body = _.pick(req.body, 'description', 'completed')
  if (!_.isBoolean(req.body.completed) || !_.isString(req.body.description)) {
    return res.sendStatus(400)
  }

  body.description = body.description.trim()
  body.id = nextTodoId++
  todos.push(body)

  res.send(body)
})

app.get('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id)
  var todoMached
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
