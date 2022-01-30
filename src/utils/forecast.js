const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
  const accessKey = '7f313b1021660647fd78530066574f9e'
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`
  request({ url, json: true }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out. There is a ${body.current.precip * 100}% chance of rain.`)
    }
  })
}
module.exports = forecast