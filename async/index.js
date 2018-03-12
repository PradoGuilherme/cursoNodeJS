const weather = require('./weather.js')
const location = require('./location.js')

// weather(function (message) {
//   console.log(message)
// })

weather('Maringá', function (weather) {
  console.log(weather)
})
location(function (location) {
  if (!location) {
    console.log('Error')
    return
  }
  console.log('city:', location.city)
})
