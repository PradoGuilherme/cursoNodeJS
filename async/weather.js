const request = require('request')

module.exports = function (location, callback) {
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e974993f57adef7495df5e89727c5797&units=metric&lang=pt`
  console.log('URL => ', url)
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      callback('Usable to fetch weather.')
    } else {
      callback('Está ', body.main.temp, '°C em', body.name)
    }
  })
}
