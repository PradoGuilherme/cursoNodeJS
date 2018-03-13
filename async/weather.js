const request = require('request')

module.exports = function (location, callback) {
  if (!location) {
    callback('No location')
  }
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&APPID=e974993f57adef7495df5e89727c5797&units=metric&lang=pt`
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      callback('Usable to fetch weather.')
    } else {
      callback('Esta ' + body.main.temp + '°C em ' + body.name)
    }
  })
}
