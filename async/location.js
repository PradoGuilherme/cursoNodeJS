const request = require('request')
const url = 'https://ipinfo.io'

module.exports = function (callback) {
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (error) {
      callback('Usable to fetch weather.')
    } else {
      callback(body)
    }
  })
}
