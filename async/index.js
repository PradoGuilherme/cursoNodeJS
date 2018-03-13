const argv = require('yargs')
  .options('location', {
    demand: false,
    alias: 'l',
    description: 'location',
    type: 'string'
  })
  .help('help')
  .argv

const weather = require('./weather.js')
const location = require('./location.js')

if (typeof argv.l === 'string' && argv.l.length > 0) {
  weather(argv.l, function (weather) {
    console.log(weather)
  })
} else {
  location(function (callback) {
    if (callback) {
      weather(callback, function (returnWeather) {
        if (returnWeather) {
          console.log(returnWeather)
        }
      })
    } else {
      console.log('Location not found')
    }
  })
}