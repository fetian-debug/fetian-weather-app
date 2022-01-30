const request = require('request')

const forecast = (country, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7f313b1021660647fd78530066574f9e&query=${country}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast



// http://api.weatherstack.com/current?access_key=${accessKey}&query=${country