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
  var queryParams = req.query
  var filteredTodos = todos

  if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
    filteredTodos = _.where(filteredTodos, { completed: true })
  } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    filteredTodos = _.where(filteredTodos, { completed: false })
  }

  if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
    filteredTodos = _.filter(filteredTodos, function (todo) {
      return todo.description.indexOf(queryParams.q.toLowerCase()) > -1
    })
  }
  res.json(filteredTodos)
})

app.post('/todos', function (req, res) {
  var body = _.pick(req.body, 'description', 'completed')
  if (!_.isBoolean(req.body.completed) || !_.isString(req.body.description) || body.description.trim().length === 0) {
    return res.sendStatus(400)
  }

  body.description = body.description.trim()
  body.id = nextTodoId++
  todos.push(body)

  res.send(body)
})

app.get('/todos/:id', function (req, res) {
  const todoId = parseInt(req.params.id)
  var todoMached = _.findWhere(todos, { id: todoId })
  if (todoMached) {
    res.json(todoMached)
  } else {
    res.status(404).send('Not find to do')
  }
})

app.delete('/todos/:id', function (req, res) {
  const todoId = parseInt(req.params.id)
  var todoMached = _.findWhere(todos, { id: todoId })
  todos = _.without(todos, todoMached)
  if (todoMached) {
    res.json(todos)
  } else {
    res.status(404).send('Not find to do')
  }
})

app.put('/todos/:id', function (req, res) {
  const todoId = parseInt(req.params.id)
  var todoMached = _.findWhere(todos, { id: todoId })
  var body = _.pick(req.body, 'description', 'completed')
  var validAttributes = {}

  if (!todoMached) {
    return res.status(404).send()
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(req.body.completed)) {
    validAttributes.completed = body.completed
  } else if (body.hasOwnProperty('completed')) {
    return res.status(400).send("Completed must be a boolean")
  }

  if (body.hasOwnProperty('description') && body.description.trim().length > 0 && _.isString(body.description)) {
    validAttributes.description = body.description
  } else if (body.hasOwnProperty('description')) {
    return res.status(400).send("Description error")
  }

  if (_.extend(todoMached, validAttributes)) {
    res.json(todos)
  } else {
    res.status(500).send()
  }
})

app.listen(PORT, function () {
  console.log('Server start on', PORT)
})
